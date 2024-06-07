<?php

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/users/create', function (Request $request) {
    //Validated
    $validateUser = Validator::make($request->all(), 
    [
        'name' => 'required',
        'email' => 'required|email|unique:users,email',
        'password' => 'required'
    ]);

    if($validateUser->fails()){
        return response()->json([
            'success' => false,
            'message' => 'validation error',
            'errors' => $validateUser->errors()
        ], 401);
    }

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password)
    ]);

    return response()->json([
        'success' => true,
        'message' => 'User Created Successfully',
        'data' => [
            'token' => $user->createToken("auth_token")->plainTextToken,
            'user' => $user,
        ]
    ], 200);
});
Route::post('auth/login', function(Request $request){

    $validateUser = Validator::make($request->all(), 
    [
        'email' => 'required|email',
        'password' => 'required'
    ]);

    if($validateUser->fails()){
        return response()->json([
            'success' => false,
            'message' => 'validation error',
            'errors' => $validateUser->errors()
        ], 401);
    }

    if(!Auth::attempt($request->only(['email', 'password']))){
        return response()->json([
            'success' => false,
            'message' => 'Email & Password does not match with our record.',
        ], 401);
    }

    $user = User::where('email', $request->email)->first();

    return response()->json([
        'success' => true,
        'message' => 'Utilisateur connecté avec succès',
        'data' => [
            'token' => $user->createToken("auth_token")->plainTextToken,
            'user' => $user,
        ]
    ], 200);
});

Route::get('/categories/all', function () {
    return Category::all();
});
Route::get('/categories/one/{id}', function (int $id) {
    return Category::find($id);
});
Route::get('/products/all', function () {
    return Product::with(['category', 'images'])->get();
});
Route::get('/products/one/{id}', function (int $id) {
    return Product::with(['category', 'images'])->find($id);
});
Route::get('/products/many/by-category/{id}', function (int $id) {
    return Product::with(['category', 'images'])->where('categoryId', $id)->get();
});
Route::post('/orders/create', function (Request $request) {
    // Define validation rules
    $rules = [
        'fullname' => 'required|max:255',
        'province' => 'required',
        'address' => 'required',
        'phoneNumber' => 'required',
        'date' => 'required',
        'total' => 'required',
        'deliveryCost' => 'required',
        'status' => 'required',
    ];

    $messages = [
        'required' => 'Le champ :attribute est obligatoire.',
        'max' => 'Le champ :attribute ne doit pas dépasser :max caractères.',
    ];

    // Perform validation with custom messages
    $validator = Validator::make($request->all(), $rules, $messages);

    // Check if validation fails
    if ($validator->fails()) {
        // Return validation errors
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $item = Order::create([
        "fullname" => $request->fullname,
        "province" => $request->province,
        "address" => $request->address,
        "phoneNumber" => $request->phoneNumber,
        "sinfo" => $request->sinfo,
        "total" => $request->total,
        "deliveryCost" => $request->deliveryCost,
        "status" => $request->status,
        "date" => $request->date,
        "notes" => ''
    ]);

    foreach ($request->items as $key => $value) {
        OrderItem::create([
            "productId" => $value['productId'],
            "quantity" => $value['quantity'],
            "salePrice" => $value['salePrice'],
            "amount" => $value['amount'],
            "orderId" => $item['id']
        ]);
    }

    return response()->json([
            'message' => 'Création réussie!', 
            'item' => $item, 
            'success' => true
        ], 201);
});



Route::middleware('auth:sanctum')->group(function () {

    Route::get('/users/all', function () {
        return User::all();
    });
    Route::post('auth/logout', function (Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    });
    Route::get('auth/me', function (Request $request){
        return response()->json($request->user());
    });
    Route::get('/categories/pagiante', function (Request $request) {
        
        $offset = ($request->pageIndex - 1) * $request->pageSize;

        $categories = Category::skip($offset)->take($request->pageSize)->get();
        
        return response()->json([
            'items' => $categories,
            'pageIndex' => $request->pageIndex,
            'pageSize' => $request->pageSize,
            'totalCount' => Category::count(),
        ]);
    });
    Route::post('/categories/create', function (Request $request) {
    
        // Define validation rules
        $rules = [
            'name' => 'required|max:255',
        ];

        $messages = [
            'required' => 'Le champ :attribute est obligatoire.',
            'max' => 'Le champ :attribute ne doit pas dépasser :max caractères.',
        ];

        // Perform validation with custom messages
        $validator = Validator::make($request->all(), $rules, $messages);

        // Check if validation fails
        if ($validator->fails()) {
            // Return validation errors
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $item = Category::create([
            "name" => $request->name
        ]);

        return response()->json([
                'message' => 'Création réussie!', 
                'item' => $item, 
                'success' => true
            ], 201);
    });
    Route::put('/categories/update/{id}', function (Request $request, int $id) {    
        // Define validation rules
        $rules = [
            'name' => 'required|max:255',
        ];

        $messages = [
            'required' => 'Le champ :attribute est obligatoire.',
            'max' => 'Le champ :attribute ne doit pas dépasser :max caractères.',
        ];

        // Perform validation with custom messages
        $validator = Validator::make($request->all(), $rules, $messages);

        // Check if validation fails
        if ($validator->fails()) {
            // Return validation errors
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = Category::find($id);
        $category->name = $request->name;
        $category->save();
        $item = Category::find($id);

        return response()->json([
            'message' => 'Modification réussie!', 
            'item' => $item, 
            'success' => true
        ], 201);
    });
    Route::delete('/categories/delete/{id}', function (int $id) {
        $category = Category::find($id);
        $category->delete();
    });
    Route::get('/products/pagiante', function (Request $request) {
        
        $offset = ($request->pageIndex - 1) * $request->pageSize;

        $products = Product::with(['category', 'images'])->skip($offset)->take($request->pageSize)->get();
        
        return response()->json([
            'items' => $products,
            'pageIndex' => $request->pageIndex,
            'pageSize' => $request->pageSize,
            'totalCount' => Product::count(),
        ]);
    });
    Route::post('/products/create', function (Request $request) {
        // Define validation rules
        $rules = [
            'name' => 'required|max:255',
            'oldPrice' => 'required',
            'newPrice' => 'required',
            'showAsDiscount' => 'required',
            'showQuantityInStock' => 'required',
            'quantityInStock' => 'required',
            'image' => 'required',
            'categoryId' => 'required',
        ];

        $messages = [
            'required' => 'Le champ :attribute est obligatoire.',
            'max' => 'Le champ :attribute ne doit pas dépasser :max caractères.',
        ];

        // Perform validation with custom messages
        $validator = Validator::make($request->all(), $rules, $messages);

        // Check if validation fails
        if ($validator->fails()) {
            // Return validation errors
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $item = Product::create([
            "name" => $request->name,
            "oldPrice" => $request->oldPrice,
            "newPrice" => $request->newPrice,
            "showAsDiscount" => $request->showAsDiscount,
            "showQuantityInStock" => $request->showQuantityInStock,
            "quantityInStock" => $request->quantityInStock,
            "image" => $request->image,
            "description" => $request->description,
            "categoryId" => $request->categoryId,
        ]);

        foreach ($request->images as $key => $value) {
            ProductImage::create([
                "content" => $value,
                "productId" => $item->id,
            ]);
        }

        return response()->json([
                'message' => 'Création réussie!', 
                'item' => $item, 
                'success' => true
            ], 201);
    });
    Route::put('/products/update/{id}', function (Request $request, int $id) {    
        // Define validation rules
        $rules = [
            'name' => 'required|max:255',
            'oldPrice' => 'required',
            'newPrice' => 'required',
            'showAsDiscount' => 'required',
            'showQuantityInStock' => 'required',
            'quantityInStock' => 'required',
            'image' => 'required',
            'categoryId' => 'required',
        ];

        $messages = [
            'required' => 'Le champ :attribute est obligatoire.',
            'max' => 'Le champ :attribute ne doit pas dépasser :max caractères.',
        ];

        // Perform validation with custom messages
        $validator = Validator::make($request->all(), $rules, $messages);

        // Check if validation fails
        if ($validator->fails()) {
            // Return validation errors
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product = Product::find($id);

        $product->name = $request->name;
        $product->oldPrice = $request->oldPrice;
        $product->newPrice = $request->newPrice;
        $product->showAsDiscount = $request->showAsDiscount;
        $product->showQuantityInStock = $request->showQuantityInStock;
        $product->quantityInStock = $request->quantityInStock;
        $product->image = $request->image;
        $product->description = $request->description;
        $product->categoryId = $request->categoryId;

        $product->save();
        $item = Product::find($id);

        ProductImage::where('productId', $id)->delete();

        foreach ($request->images as $key => $value) {
            ProductImage::create([
                "content" => $value,
                "productId" => $item->id,
            ]);
        }


        return response()->json([
            'message' => 'Modification réussie!', 
            'item' => $item, 
            'success' => true
        ], 201);
    });
    Route::delete('/products/delete/{id}', function (int $id) {
        ProductImage::where('productId', $id)->delete();
        $product = Product::find($id);
        $product->delete();
    });


    Route::get('/orders/count', function() {
        return Order::where('status', 'En attente')->count();
    });
    Route::get('/orders/pagiante', function (Request $request) {
        
        $offset = ($request->pageIndex - 1) * $request->pageSize;

        $orders = Order::skip($offset)->take($request->pageSize)->get();
        
        return response()->json([
            'items' => $orders,
            'pageIndex' => $request->pageIndex,
            'pageSize' => $request->pageSize,
            'totalCount' => Product::count(),
        ]);
    }); 
    Route::put('/orders/update/{id}', function (Request $request, int $id) {    
        // Define validation rules
        $rules = [
            'id' => 'required',
            'status' => 'required',
        ];

        $messages = [
            'required' => 'Le champ :attribute est obligatoire.',
            'max' => 'Le champ :attribute ne doit pas dépasser :max caractères.',
        ];

        // Perform validation with custom messages
        $validator = Validator::make($request->all(), $rules, $messages);

        // Check if validation fails
        if ($validator->fails()) {
            // Return validation errors
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $order = Order::find($id);

        $order->status = $request->status;
        $order->notes = $request->notes;

        $order->save();
        $item = Order::find($id);

        return response()->json([
            'message' => 'Modification réussie!', 
            'item' => $item, 
            'success' => true
        ], 201);
    });
    Route::get('/orders/one/{id}', function (int $id) {
        return Order::with(['items.product'])->find($id);
    });
});