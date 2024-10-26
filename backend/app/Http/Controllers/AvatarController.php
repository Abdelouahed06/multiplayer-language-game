<?php

namespace App\Http\Controllers;

use App\Models\Avatar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;


class AvatarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $avatars = Avatar::all();
        if ($avatars->count() > 0) {
            return response()->json([
                'status' => 200,
                'avatars' => $avatars
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
        $validator = Validator::make($request->all(), [
            'avatar' => 'required|file|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'required|string|max:20|unique:avatars,avatar',
            'price' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {
            if($request->hasFile('avatar')){
            $file = $request->file('avatar');
            $avatarName = $request->input('name');
            $price = $request->input('price');
            $avatarName01 = $avatarName . '.' . $file->extension();
            $file->move(public_path('avatars'), $avatarName01);
            $avatar = Avatar::create([
            'avatar' => $avatarName01,
            'price' => $price,
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Image uploaded successfully',
            ], 200);
            }if($image){
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

    public function destroy($id)
    {
        $avatar = Avatar::find($id);
        if ($avatar) {
            // Delete avatar file
            File::delete(public_path('avatars/' . $avatar->avatar));
            $avatar->delete();
            return response()->json([
                'status' => 200,
                'message' => 'avatar deleted successfully',
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'avatar not found',
            ], 404);
        }
    }
}
