<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class LanguageController extends Controller
{
    
    public function indexPlayer()
    {
        $languages = Language::all();
        return response()->json(['languages' => $languages]);
    }


    public function indexAdmin()
    {
        $languages = Language::all();
        if ($languages->count() > 0) {
            return response()->json([
                'status' => 200,
                'languages' => $languages
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
                'language' => 'required|string',
                'short_form' => 'required|string',
                'native_state' => 'required',
                'goal_state' => 'required'
            ]);
        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);
        }else{
            $languages = Language::create([
                'language' => $request->language,
                'short_form' => $request->short_form,
                'native_state' => intval($request->native_state),
                'goal_state' => intval($request->goal_state),
            ]);
            if($languages){
                return response()->json([
                    'status' => 200,
                    'message' => 'language Created Successfully'
                ],200);
            }else{
                return response()->json([
                    'status' => 500,
                    'message' => 'Error language Not Created'
                ],500);
            }
        }

    } 
    
    public function edit($id)
    {
        $language = Language::find($id);
        if ($language) {
            return response()->json([
                'status' => 200,
                'language' => $language
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No language found!'
            ], 404);
        }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'language' => 'required|string',
            'short_form' => 'required|string',
            'native_state' => 'required',
            'goal_state' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ], 422);
        } else {
            $language = Language::find($id);
            if ($language) {
                $language->update([
                    'language' => $request->language,
                    'short_form' => $request->short_form,
                    'native_state' => intval($request->native_state),
                    'goal_state' => intval($request->goal_state),
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'language updated'
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No language found'
                ], 404);
            }
        }
    }


    public function destroy($id)
    {
        $language = Language::find($id);
        if ($language) {
            $language->delete();
            return response()->json([
                'status' => 200,
                'message' => 'language deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No language found'
            ], 404);
        }
    }



}
