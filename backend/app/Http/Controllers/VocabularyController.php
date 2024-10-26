<?php

namespace App\Http\Controllers;

use App\Models\Vocabulary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class VocabularyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $vocabularies = Vocabulary::with('image', 'goalLanguage')->get();
        return response()->json(['vocabularies' => $vocabularies]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'image_id' => 'nullable|exists:images,id',
                'definition' => 'nullable|string',
                'op1' => 'required|string',
                'op2' => 'required|string',
                'op3' => 'required|string',
                'op4' => 'required|string',
                'glang_id' => 'required|exists:languages,id',
                'level' => 'required|string|max:2',
            ]
        );

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {
            $vocabulary = Vocabulary::create([
                'image_id' => $request->image_id,
                'definition' => $request->definition,
                'op1' => $request->op1,
                'op2' => $request->op2,
                'op3' => $request->op3,
                'op4' => $request->op4,
                'glang_id' => $request->glang_id,
                'level' => $request->level,
            ]);

            if($vocabulary){
                return response()->json([
                    'status' => 201,
                    'v' => $vocabulary,
                    'message' => 'Vocabulary created successfully',
                ], 201);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Error: Vocabulary not created',
                ], 500);
            }
        }
    }

    public function edit($id) {
        $vocabulary = Vocabulary::with('image', 'goalLanguage')->find($id);

        if ($vocabulary) {
            return response()->json([
                'status' => 200,
                'vocabulary' => $vocabulary,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Vocabulary not found',
            ], 404);
        }
    }


    public function update(Request $request, $id)
    {
        $vocabulary = Vocabulary::find($id);

        if (!$vocabulary) {
            return response()->json([
                'status' => 404,
                'message' => 'Vocabulary not found',
            ], 404);
        }

        $validator = Validator::make($request->all(),
            [
                'image_id' => 'nullable|exists:images,id',
                'definition' => 'nullable|string',
                'op1' => 'required|string',
                'op2' => 'required|string',
                'op3' => 'required|string',
                'op4' => 'required|string',
                'glang_id' => 'required|exists:languages,id',
                'level' => 'required|string|max:2',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {
            $vocabulary->update([
                'image_id' => $request->image_id,
                'definition' => $request->definition,
                'op1' => $request->op1,
                'op2' => $request->op2,
                'op3' => $request->op3,
                'op4' => $request->op4,
                'glang_id' => $request->glang_id,
                'level' => $request->level,
            ]);

            return response()->json([
                'status' => 200,
                'vocabulary' => $vocabulary,
                'message' => 'Vocabulary updated successfully',
            ], 200);
        }
    }


    
    public function destroy($id)
    {
        $vocabulary = Vocabulary::find($id);
        if ($vocabulary) {
            $vocabulary->delete();
            return response()->json([
                'status' => 200,
                'message' => 'vocabulary deleted successfully',
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'avatar not found',
            ], 404);
        }
    }
}
