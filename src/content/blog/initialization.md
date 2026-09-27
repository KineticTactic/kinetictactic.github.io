---
title: "Initialization in C++"
description: "looking into the gazillion different ways of initializing a variable in C++"
date: "2026-09-27"
tags:
  - cpp
---

# Initialization in C++

## Aggregate Initialization

So what is an aggregate type?

An **aggregate type** in C++ is basically a type that is a relatively simple collection of members.

A class is an aggregate if it has:
- no user-declared or inherited constructors
- no private/protected non-static data members
- no private/protected base classes
- no virtual functions
- no virtual base classes

This is an aggregate type.

```cpp
struct A {
    int x;
    double y;
};
```

This is NOT an aggregate type since it has a constructor.

```cpp
struct B {
    int x;
    
    B() {}
};
```

Note that this is ALSO NOT an aggregate type since it has a user-**declared** constructor.

```cpp
struct A {
    int x;

    A() = default;
};
```

Aggregates can be initialized using an *braced list*, which is basically a collection of things enclosed in `{}`;

```cpp
struct Point {
    int x;
    int y;
};

Point p{10, 20};
```

What happens in aggregate initialization?

- values in the braced list are mapped sequentially to the members of the type in order of their declaration.
- if some values are omitted in the list, either
  1. it may have a *default member initializer*
  
  ```cpp
  struct A {
      int x = 29; // default member initializer
  };
  ```
  
  2. Otherwise, it is initialized from an empty initializer list `{}`.
  
  ```cpp
  struct A {
      int x;
      int y;
  };
  A a{20}; 
  // here a.y is initialized equivalent to the following line
  int y{}; // empty initializer list
  ```
  
  this results in *value initialization* of a.y.

## Value initialization

Value initialization occurs in the following cases:

```cpp
T()
T{}
new T()
new T{}
T a{};
```

What happens in value initialization?

- If T is an **aggregate**, it is *aggregate initialized*.
- If T is a **class type**, then
  1. if default initialization selects a constructor, and if the constructor is NOT **user-provided**, it is FIRST *zero initialized*.
  2. it is  then *default initialized*.
- If T is an **array type**, each element is *value initialized*.
- Otherwise, it is *zero initialized*.

Note that when you write any of the following

```cpp
T* a = new T{};
T* a = new T();
T a = T();
T a = T{};
```

There are two types of initialization here. First, the RHS creates an temporary which is *value initialized* (or *aggregate initialized* if T is an aggregate). Then `a` is *copy initialized* from this temporary.

It does not necessarily mean there is a copy. In modern C++ (C++17+), when the types match, the object can be initialized directly without a copy/move construction

## Default initialization

Default initialization happens in the following cases:

```cpp
T a;
new T
```

What happens in defaut initialization?

- If T is a **class type**, *default constructor* (either implicit or user-defined) is called.
- If T is an **array type**, every element is *default initialized*.
- Otherwise, *no initialization is perfomed*.

Note that when you write the following

```cpp
T* a = new T;
```

There are two types of initialization here. First, `new T` creates a dynamically created object which is *default initialized*. Then `a` is *copy initialized* from this temporary.

## Zero initialization

There is no specific syntax for zero initialization. It may occur as a part of *value initialization*.

What happens in zero initialization?

- If T is a **scalar** (like `int`) it is initialized to zero.
- If T is a **non-union class type**,
  1. padding bits are set to zero
  2. Non static data members are *zero initialized*.
- If T is a **union type**,
  1. padding bits are set to zero
  2. first non-static named data member is *zero initialized*.
- If T is an **array type**, elements are *zero initialized*.
- If T is a reference, nothing is done.

## List initialization

List initialization is kind of an umbrella term generalizing the cases where `{a, b, c...}` is used to initialize an object.

There are two types:

- *direct-list initialization*

```cpp
T x{a, b, c, ...};
```

- *copy-list initialization*

```cpp
T x = {a, b, c, ...};
```

Both of them also have the **designated initializer list** syntax (C++ 20 onwards) which is a part of C (C99+).

```cpp
T x{.des1 = a, .des2 = b, ...};
T x = {.des1 = a, .des2 = b, ...};
```

Note that the following is also an example of *copy-list initialization*

```cpp
T foo() {
    return {a, b, c, ...};
}
```

If T is an aggregate, list initialization converts (or boils down to) *aggregate-initialization*.  For example,

```cpp
struct Point {
 int x;
 int y;
}; // an aggregate type

Point p{10, 20}; // just becomes aggregate initialization
```

If T is a class with constructors, it performs *overload resolution* to find matching constructors.

If there is a matching constructor it is called. If there is a constructor accepting `std::initializer_list`, it gets priority. For example,

```cpp
struct A {
    A(int, int);
    A(std::initializer_list<int>);
};
A a{1, 2}; // the second constructor is called.
```

Narrowing conversions are forbidden.

```cpp
int x = 3.14;  // allowed
int x{3.14};   // NOT allowed
```

If no matching constructors are found, it results in a *compiler error*.

Some other terms,

## Copy initialization

Anything of the form

```cpp
T x = value;
```

Copy-initialization is an initialization category, not a guarantee that a copy occurs. Depending on the source expression and available conversions/constructors, it may involve a conversion constructor, copy constructor, move constructor, or no copy/move at all.

## Direct initialization

```cpp
int x(10);     // direct-initialization
int x{10};     // direct-list-initialization

A a(10);       // direct-initialization
A a{10};       // direct-list-initialization
```

Compare it with copy-initialization:

```cpp
int a(10);     // direct-initialization
int b = 10;    // copy-initialization

A a(10);       // direct-initialization
A b = 10;      // copy-initialization
```


---


## Now let's deal with constructors.

A **default constructor** is one which can be called with *zero arguments*.

Both of these are default constructors

```cpp
struct A {
    A(); 
};
struct B {
    B(int x = 10);
};
```

If you don't declare a constructor yourself, C++ can automatically declare one for you. This is called an **implictly-declared constructor** (not implicitly-defined, note the distinction).

```cpp
struct A {
    int x;
};

A a;
```

> conceptually, the compiler generates `A::A()`.

But declaring ANY constructor changes things. If you define a constructor `A(int)`, **the compiler does NOT automatically generate `A()` anymore**. In this case, the default constructor would NOT exist.

This is the reason the following code generates a compilation error:

```cpp
struct T {
    int mem1;
    std::string mem2;

    T(const T&) {}
};

T a{};
```

Here, `a` is value-initialized. Let's go through the steps of value initialization. `a` is not an aggregate. `a` is a class-type. It's default initialization does not select an implicitly-declared constructor (hence it is NOT zero-initialized). Then, `a` is *default-initialized*. Default initialization requires the default constructor be called. However, there is NO default constructor. The compiler panics and results in an error.

In the C++ standard there is a distinction between *user-declared* and *user-provided* constructor. One important example is this

```cpp
A() = default;
```

This is NOT user-provided, but it ALSO NOT *implicitly-declared*. It falls under the category of **user-declared constructor**. This is important, because as we saw in value initialization, it is only zero initialized if there is NO *user-provided constructor*. Therefore, in the following example, `a.x` has a determinate value of ZERO.

```cpp
struct A {
    int x;

    A() = default;
};

A a{};
```

### Member initializer lists

```cpp
class T {
    int y;
    int x;
    T() 
        : x(20), y(40) // This is called a member initializer list.
    {}
};
```

Note that the members are initialized NOT in the order that they appear in the member initializer list, BUT in the order that they appear in the class declaration.
In the above case, `y` is initialized BEFORE `x`.

If a member appears in the initializer list with an empty initializer (`x()` or `x{}`) it is **value-initialized**.

If a member does NOT appear in the initializer list, and it does NOT have a *default member initializer*, then it is **default-initialized**.

It is illustrated clearly with the following example:

```cpp
struct A {
    int x;

    A() : x() {} // x is value-initialized
};
struct B {
    int x;

    B() {} // x is default-initialized
};

A a{};
B b{};

std::cout << a.x << " " << b.x;
```

here `a.x` is ZERO since it is value-initialized, but `b.x` is **indeterminate** since it is default-initialized.

## Examples

```cpp
struct A {
    int x;

    A() {}
};

A a{};
```

here `a` is value-initialized. Since there is a user-provided constructor, it is NOT zero-initialized. Then, the `A()` default constructor is called. In the member initializer list `x` is not mentioned, so it is **default-initialized**. Hence, `a.x` has **indeterminate value**.

```cpp
struct A {
    int x;
    std::string s;

    A() {}
};

A a{};
```

Same as above, `x` will have indeterminate value, but `string` will be default initialized to an empty-string (since `std::string` has default constructor which does that).

```cpp
struct A {
    int x;
    std::string s;
};

A a{};

std::cout << a.x << ' ' << a.s.size();
```

This one has a trap. Notice that `A` is an **aggregate type**. Hence `a` is aggregate initialized. Since `x` and `s` are omitted in the aggregate list, they are *value-initialized*. Hence, `x == 0` and `s.size() == 0` they are determinate values.

```cpp
struct A {
    int& ref;

    A() {}
};

A a;
```

`ref` is a reference data member that is not mentioned in the mem-initializer list and has no default member initializer. Therefore the constructor cannot initialize it. A reference member must be bound to an object during initialization, so the constructor is ill-formed (in practice, the implicitly/defaulted initialization requirements cause the constructor to be deleted or the declaration to be diagnosed).

---

## Further reading

- cppreference:
  1. [Value-initialization](https://en.cppreference.com/cpp/language/value_initialization)
  2. [Zero-initialization](https://en.cppreference.com/cpp/language/zero_initialization)
  3. [Default-initialization](https://en.cppreference.com/cpp/language/default_initialization)
  4. [List-initialization](https://en.cppreference.com/cpp/language/list_initialization)
  5. [Aggregate initialization](https://en.cppreference.com/cpp/language/aggregate_initialization)
  6. [Direct-initialization](https://en.cppreference.com/cpp/language/direct_initialization)
  7. [Copy-initialization](https://en.cppreference.com/cpp/language/copy_initialization)
  8. [Default constructor](https://en.cppreference.com/cpp/language/default_constructor)
  9. [Constructors and member initializer lists](https://en.cppreference.com/cpp/language/constructor)
- [Sy Brand - Initialization in C++ is Bonkers](https://tartanllama.xyz/posts/cpp-initialization-is-bonkers/)
- [Mike Lui - Initialization in C++ is Seriously Bonkers](https://mikelui.io/2019/01/03/seriously-bonkers.html)
