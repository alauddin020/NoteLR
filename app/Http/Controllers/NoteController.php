<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    //TODO:: Show User all Notes
    public function index()
    {
        return response()->json(['note'=>Note::with('user')->where('user_id',Auth::id())->get()]);
    }

    //TODO:: Create New Note and Data Store into Database
    public function store(Request $request)
    {
        Note::create([
            'note'=>$request->note,
            'user_id'=>Auth::id()
        ]);
    }
    //TODO:: Edit User Note
    public function edit($id)
    {
        $note = Note::with('user')->where('user_id',Auth::id())->find($id);
        if ($note)
        {
            return response()->json(['message'=>'ok','data'=>$note]);
        }
    }

    //TODO:: Update User Note
    public function update(Request $request, $id)
    {
        $note = Note::find($id);
        $note->note = $request->note;
        $note->save();
    }
    //TODO:: Delete User Note
    public function destroy($note)
    {
        Note::destroy($note);
    }
}
