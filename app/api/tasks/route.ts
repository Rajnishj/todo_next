import connectToDB from "@/app/libs/mongodb";
import Task from "@/app/models/taskSchema";
import { HttpError } from "@/app/utils/helper";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const tasks = await Task.find();
    return NextResponse.json({ data: tasks });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { text } = await req.json();
    if (!text) {
      throw new HttpError("Text is required field.", 400);
    }
    const alreadyExist = await Task.findOne({
      text: { $regex: new RegExp(`^${text}$`, "i") },
    });

    if (alreadyExist) {
      throw new HttpError("Todo already present in the list", 409);
    }
    const newTodo = new Task({
      text,
      completed: false,
    });
    if (newTodo) {
      await newTodo.save();
      return NextResponse.json(
        { message: "Todo added successfully!!", todo: newTodo },
        { status: 201 }
      );
    }
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const { text } = await req.json();
    const id = req.nextUrl.searchParams.get("id");
    if (!text) {
      throw new HttpError("Text is required field.", 400);
    }

    const itemToUpdate = await Task.findById(id);
    itemToUpdate.text = text;
    itemToUpdate.completed = true;
    await itemToUpdate.save();
    return NextResponse.json(
      { message: "Todo Updated successfully!!", todo: itemToUpdate },
      { status: 200 }
    );
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
export async function DELETE(req: NextRequest, { params }: any) {
  try {
    await connectToDB();
    const id = req.nextUrl.searchParams.get("id");
    const url = new URL(req.url);
    const deleteAll = url.searchParams.get("all") === "true";
    if (deleteAll) {
      const result = await Task.deleteMany({});
      return NextResponse.json(
        { message: `${result.deletedCount} tasks deleted Successfully.` },
        { status: 200 }
      );
    }
    const todos = await Task.findByIdAndDelete(id);
    if (!todos) {
      throw new HttpError("Task not found", 404);
    }
    return NextResponse.json(
      { message: "Task deleted successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    const status = error.statusCode || 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
