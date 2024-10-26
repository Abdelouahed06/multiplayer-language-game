<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Player;
use App\Models\Admin;


class AuthController extends Controller
{
    
     // Player Login
     function playerLogin(Request $request) {

        $validate = Validator::make($request->all(), [
            "email" => "required|email|max:40",
            "password" => "required|min:8|max:30"
        ]);

        if($validate->fails()) {
            return response()->json(["errors" => $validate->errors(), "status" => 422]);
        } 

        $player = Player::with('avatar', 'nativeLanguage', 'goalLanguage')->where('email', $request->email)->first();

        if (!$player || !Hash::check($request->password,  $player->password)) {
            return response()->json(['status' => 401]);
        }

        $token = $player->createToken($player->id)->plainTextToken;
        return response()->json(['player' => $player, 'token' => $token, 'status' => 200]);
    }

    // Player Register
    function playerRegister(Request $request) {

        $validate = Validator::make($request->all(), [
            'fname' => ['required', 'max:10', 'min:3'],
            'lname' => ['required', 'max:10', 'min:3'],
            'gender' => ['required', 'max:6'],
            'email' => ['required', 'email', 'max:40', 'unique:players,email'],
            'password' => ['required', 'min:8', 'max:30'],
            'country' => ['required'],
            'nativeLang' => ['required', 'exists:languages,id'],
            'goalLang' => ['required', 'exists:languages,id']
        ]);
        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors(), 'status' => 422]);
        }

        // Generating Player ID
        $playerId = ''.mt_rand(1, 9);
        for ($i = 0; $i < 8; $i++) {
            $playerId .= mt_rand(0, 9);
        }

        $hashedPassword = Hash::make($request->password);

        $user = Player::create([
            'id' => $playerId,
            'name' => $request->fname .' '. $request->lname,
            'gender' => $request->gender,
            'email' => $request->email,
            'password' => $hashedPassword,
            'country' => $request->country,
            'nlang_id' => $request->nativeLang,
            'glang_id' => $request->goalLang
        ]);

        $player = Player::with('avatar', 'nativeLanguage', 'goalLanguage')->where('email', $request->email)->first();


        $token = $player->createToken($playerId)->plainTextToken;
        return response()->json(['message' => 'You are signed up successfully', 'token' => $token, 'player' => $player]);
        
    }

    // Admin Login
    public function adminLogin(Request $request) {
        // admin login logic here....
        $validate = Validator::make($request->all(), [
            "email" => "required|email|max:40",
            "password" => "required|min:8|max:30"
        ]);

        if($validate->fails()) {
            return response()->json(["errors" => $validate->errors(), "status" => 422]);
        } 

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password,  $admin->password)) {
            return response()->json(['status' => 401]);
        }

        $token = $admin->createToken($admin->id)->plainTextToken;
        return response()->json(['admin' => $admin, 'token' => $token, 'status' => 200]);
    }

    // Player Register
    function adminRegister(Request $request) {

        $validate = Validator::make($request->all(), [
            'name' => ['required', 'max:22', 'min:7'],
            'email' => ['required', 'email', 'max:40', 'unique:admins,email'],
            'password' => ['required', 'min:8', 'max:30'],
            'permission' => ['required'],
        ]);
        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors(), 'status' => 422]);
        }

        $hashedPassword = Hash::make($request->password);

        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $hashedPassword,
            'permission' => $request->permission
        ]);

        $token = $admin->createToken($admin->id)->plainTextToken;
        return response()->json(['message' => 'You are signed up successfully', 'token' => $token, 'admin' => $admin]);
        
    }


    // Logout For Both Player And Admin
    public function logout()
    {
        auth('sanctum')->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully', 'status' => 200]);
    }
    
}
