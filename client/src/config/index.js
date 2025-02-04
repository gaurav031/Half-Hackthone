export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Name of the Service",
    name: "Name of the Service",
    componentType: "input",
    type: "text",
    placeholder: "Name of the Service",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter Service description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "barber", label: "barber" },
      { id: "carpenter", label: "carpenter" },
      { id: "Plumber", label: "Plumber" },
      { id: "Electician", label: "Electician" },
      { id: "Tiffin Services", label: "Tiffin Services" },
    ],
  },
  {
    label: "Type of Service",
    name: "Type of Service",
    componentType: "select",
    options: [
      { id: "Home Based-Service", label: "Home-Service" },
      { id: "Shop Based-Service", label: "Shop-Service" },
      // { id: "puma", label: "Puma" },
      // { id: "levi", label: "Levi's" },
      // { id: "zara", label: "Zara" },
      // { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price per Hr",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter Your Service price",
  },
  // {
  //   label: "Available Time",
  //   name: "Available Time",
  //   componentType: "time",
  //   type: "time",
  //   placeholder: "Select the timing",
  // },
  {
    label: "Area",
    name: "area",
    componentType: "input",
    type: "text",
    placeholder: "Enter Your Service area",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Service",
    path: "/shop/listing",
  },
  {
    id: "Become a Service Provider",
    label: "Become a Service Provider",
    path: "/shop/listing",
    className: "bg-red-500 text-white p-2 rounded-md hover:bg-red-600",
  },  
  // {
  //   id: "women",
  //   label: "Women",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "kids",
  //   label: "Kids",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "footwear",
  //   label: "Footwear",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "accessories",
  //   label: "Accessories",
  //   path: "/shop/listing",
  // },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  barber: "Barber",
  carpenter: "Carpenter",
  plumber: "Plumber",
  electrician: "Electrician",
  tiffinservice: "Tiffin Service",
};

export const brandOptionsMap = {
  homeBasedService: "Home Based Service",
  shopBasedService: "Shop Based Service",
  BothService: "Both Service",
  // puma: "Puma",
  // levi: "Levi",
  // zara: "Zara",
  // "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "barber", label: "barber" },
      { id: "carpenter", label: "carpenter" },
      { id: "Plumber", label: "Plumber" },
      { id: "Electician", label: "Electician" },
      { id: "Tiffin Services", label: "Tiffin Services" },
  ],
  Services: [
    { id: "Home Based-Service", label: "Home-Service" },
    { id: "Shop Based-Service", label: "Shop-Service" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "nearBy", label: "NearBy" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
