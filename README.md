# barcoder

## App Introduction

Barcoder is Offline to Online commerce app that allows us to scan the barcode of product and find its online retail easily.

---

## Development Information

It was small project that took two weeks to develop with agile process. I have developed frontend alone with two backend develpers and one designer.

---

## Features Developed

### **Login/Register Page**

Register, SMS authentication system, JWT token will refresh automatically when expired using Axios Interceptor and Autologon implemented. React-hook-form is used to handle and validate the register data efficiently. Login supports auto-login by saving the token in local Keychain.

### **Home Page**

Shows banner, Search bar, item list by popular or scanned list history when logged in, floating button that opens scanner camera.

### **Search Page**

Get items in database based on \*\*\*\*search keyword from home page. shows them as a list, show not found page when there is no such item in DB.

### **Scanner Page**

Opens camera that will detect barcodes and automatically send barcode number to check if it exists in database. If the item exists, it opens the url to market using webview automatically, or it will show instruction page that says the item is currently not available and will be added in near future.

### **My Page**

shows instrution for users to login and navigate to login page if the user is not logged in. If the user is logged in, it will show brief info of user and allow them to edit it.

---
