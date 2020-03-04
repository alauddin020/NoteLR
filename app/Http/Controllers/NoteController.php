<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Note
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(['note'=>Note::with('user')->where('user_id',Auth::id())->get()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Note::create([
            'note'=>$request->note,
            'user_id'=>Auth::id()
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function show(Note $note)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Note  $note
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        $note = Note::with('user')->find($id);
        if ($note)
        {
            return response()->json(['message'=>'ok','data'=>$note]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $note = Note::find($id);
        $note->note = $request->note;
        $note->save();
    }


    public function destroy($note)
    {
        Note::destroy($note);
    }
}
