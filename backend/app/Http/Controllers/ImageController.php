<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use App\Models\Image;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = Image::all();
        if ($images->count() > 0) {
            return response()->json([
                'status' => 200,
                'images' => $images
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Records Found'
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'image' => 'required|file|mimes:jpeg,png,jpg|max:2048',
        'name' => 'required|string|max:20|unique:images,image',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'errors' => $validator->messages()
        ], 422);
    } else {
        if($request->hasFile('image')){
        $file = $request->file('image');
        $imageName = $request->input('name');
        $imageName01 = $imageName . '.' . $file->extension();
        $file->move(public_path('images'), $imageName01);
        $image = Image::create([
        'image' => $imageName01,
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



    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $image = Image::find($id);
    if ($image) {
        // Delete image file
        File::delete(public_path('images/' . $image->image));
        $image->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Image deleted successfully',
        ], 200);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'Image not found',
        ], 404);
    }
}
}
