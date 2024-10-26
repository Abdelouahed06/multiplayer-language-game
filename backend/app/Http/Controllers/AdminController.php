<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;



class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::all();
        if ($admins->count() > 0) {
            return response()->json([
                'status' => 200,
                'admins' => $admins
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
            [   'name' => 'required|string|min:8',
                'email' => 'required|email|min:12',
                'password' => 'required|min:10',
                'permission' => 'required'
            ]);
        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);
        }else{
            $admins = Admin::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'permission' => intval($request->permission),
            ]);
            if($admins){
                return response()->json([
                    'status' => 200,
                    'message' => 'Admin Created Successfully'
                ],200);
            }else{
                return response()->json([
                    'status' => 500,
                    'message' => 'Error Admin Not Created'
                ],500);
            }
        }

    }


     public function edit($id)
    {
        $admin = Admin::find($id);
        if ($admin) {
            return response()->json([
                'status' => 200,
                'admin' => $admin
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No admin found!'
            ], 404);
        }
    }

    public function updateInfo(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:8',
            'email' => 'required|email|min:12',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ], 422);
        } else {
            $admin = Admin::find($id);
            if ($admin) {
                $admin->update([
                    'name' => $request->name,
                    'email' => $request->email,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'admin updated'
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No admin found'
                ], 404);
            }
        }
    }

    public function updatePassword(Request $request, int $id)
{
    $validator = Validator::make($request->all(), [
        'old_password' => 'required',
        'new_password' => 'required|min:10',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'error' => $validator->messages()
        ], 422);
    } else {
        $admin = Admin::find($id);
        if ($admin) {
            if (Hash::check($request->old_password, $admin->password)) {
                $admin->password = Hash::make($request->new_password);
                $admin->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'Password updated successfully'
                ], 200);
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'Old password does not match'
                ], 401);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No admin found'
            ], 404);
        }
    }
}

     public function destroy($id)
    {
        $admin = Admin::find($id);
        
        if ($admin) {
            $admin->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Admin deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Admin found'
            ], 404);
        }
    }

}
