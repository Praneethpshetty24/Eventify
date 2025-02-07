import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Todo from '@/lib/models/Todo';

// GET all todos
export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find().sort({ createdAt: -1 });
    console.log('Fetched todos:', todos);
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error in GET /api/todo:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new todo
export async function POST(request) {
  try {
    const { content, userId, userName } = await request.json();
    
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!userId || !userName) {
      return NextResponse.json(
        { error: 'User ID and User Name are required' },
        { status: 400 }
      );
    }

    await connectDB();
    
    const todo = await Todo.create({
      content: content.trim(),
      userId,
      userName
    });

    if (!todo) {
      throw new Error('Failed to create todo');
    }

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/todo:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE todo
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await connectDB();
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
