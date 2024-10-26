<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Message::all();
        if ($messages->count() > 0) {
            return response()->json([
                'status' => 200,
                'messages' => $messages
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Records Found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'group' => 'required|string',
                'price' => 'required',
                'msg1' => 'required|string',
                'msg2' => 'required|string',
                'msg3' => 'required|string',
                'msg4' => 'required|string',
                'msg5' => 'required|string',
                'msg6' => 'required|string',
                'msg7' => 'required|string',
                'msg8' => 'required|string',
            ]);
        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);
        }else{
            $messages = Message::create([
                'group' => $request->group,
                'price' => intval($request->price),
                'msg1' => $request->msg1,
                'msg2' => $request->msg2,
                'msg3' => $request->msg3,
                'msg4' => $request->msg4,
                'msg5' => $request->msg5,
                'msg6' => $request->msg6,
                'msg7' => $request->msg7,
                'msg8' => $request->msg8,
            ]);
            if($messages){
                return response()->json([
                    'status' => 200,
                    'message' => 'message Created Successfully'
                ],200);
            }else{
                return response()->json([
                    'status' => 500,
                    'message' => 'Error message Not Created'
                ],500);
            }
        }

    }

    public function edit($id)
    {
        $message = Message::find($id);
        if ($message) {
            return response()->json([
                'status' => 200,
                'message' => $message
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No message found!'
            ], 404);
        }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
                'group' => 'required|string',
                'price' => 'required',
                'msg1' => 'required|string',
                'msg2' => 'required|string',
                'msg3' => 'required|string',
                'msg4' => 'required|string',
                'msg5' => 'required|string',
                'msg6' => 'required|string',
                'msg7' => 'required|string',
                'msg8' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ], 422);
        } else {
            $message = Message::find($id);
            if ($message) {
                $message->update([
                'group' => $request->group,
                'price' => intval($request->price),
                'msg1' => $request->msg1,
                'msg2' => $request->msg2,
                'msg3' => $request->msg3,
                'msg4' => $request->msg4,
                'msg5' => $request->msg5,
                'msg6' => $request->msg6,
                'msg7' => $request->msg7,
                'msg8' => $request->msg8,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'message updated'
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No message found'
                ], 404);
            }
        }
    }

    public function destroy($id)
    {
        $message = Message::find($id);
        if ($message) {
            $message->delete();
            return response()->json([
                'status' => 200,
                'message' => 'message deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No message found'
            ], 404);
        }
    }
}
