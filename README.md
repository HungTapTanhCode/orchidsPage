# FER202 - Frontend Development with React

## Project Overview

This is a comprehensive **Student Management System** built for the **FER202 course** at **FPT University**. It demonstrates all 6 labs in one integrated React application using modern frontend development practices.

### 🎓 Course Information
- **University**: FPT University
- **Course Code**: FER202
- **Subject**: Frontend Development with React
- **Level**: Intermediate to Advanced
- **Student ID**: SE172330

---

## 📚 Labs Covered

### ✅ Lab 1: React Components
Building reusable components with props and composition:
- `StudentCard` - Displays individual student information
- `StudentForm` - Reusable form component with validation
- `Navigation` - Navbar component with routing
- `LoadingSpinner` & `ErrorAlert` - Utility components

### ✅ Lab 2: React Hooks
State management with React Hooks:
- `useState` - Managing component state
- `useEffect` - Side effects and data fetching
- `useContext` - Global state with StudentContext
- **Custom Hooks**: `useForm` (form handling), `useFetch` (API calls)

### ✅ Lab 3: React Router
Multi-page navigation and routing:
- Home Page (`/`) - Landing page with course overview
- Students Page (`/students`) - List all students
- Add Student Page (`/add-student`) - Create new student
- About Page (`/about`) - Course information

### ✅ Lab 4: React UI Library (Bootstrap)
Building responsive UIs with React Bootstrap:
- React Bootstrap components (Button, Form, Card, Alert, etc.)
- Bootstrap 5 grid system and utilities
- Responsive design patterns
- Custom Bootstrap theme integration

### ✅ Lab 5: CSS Preprocessor (SCSS)
Advanced styling with SCSS:
- SCSS variables and mixins for reusable styles
- Component-scoped stylesheets
- Responsive design with SCSS media queries
- Color schemes and typography system

### ✅ Lab 6: Fetch API (Axios)
Making HTTP requests and handling async operations:
- `studentService.js` - Service layer for API calls
- Axios for HTTP requests with mock data
- Error handling and loading states
- CRUD operations (Create, Read, Update, Delete)

---

## 🛠️ Technologies Used

```
✓ React 19 - UI library with latest features
✓ React Router v7 - Client-side routing
✓ React Bootstrap 2.10 - UI component library  
✓ Bootstrap 5 - CSS framework
✓ SCSS - CSS preprocessor with variables & mixins
✓ Axios 1.18 - HTTP client for API calls
✓ Yup 1.7 - Schema validation for forms
✓ Vite 8 - Fast build tool and dev server
✓ Node.js - JavaScript runtime
```

---

## 📦 Project Structure

```
src/
├── components/                    # Reusable React components
│   ├── Navigation.jsx            # Navbar with routing
│   ├── StudentCard.jsx           # Student display component
│   ├── StudentForm.jsx           # Form with validation
│   ├── LoadingSpinner.jsx        # Loading indicator
│   └── ErrorAlert.jsx            # Error notification
│
├── pages/                        # Page components (routes)
│   ├── HomePage.jsx             # Landing page with overview
│   ├── StudentsPage.jsx         # Student list page
│   ├── AddStudentPage.jsx       # New student form page
│   └── AboutPage.jsx            # Course information page
│
├── context/                      # Global state management
│   └── StudentContext.jsx       # Student data context & provider
│
├── hooks/                        # Custom React hooks
│   ├── useForm.js              # Form state & validation logic
│   └── useFetch.js             # Data fetching with Axios
│
├── services/                    # API services layer
│   └── studentService.js       # Student API operations
│
├── styles/                      # SCSS stylesheets
│   ├── variables.scss          # Colors, mixins, breakpoints
│   ├── global.scss             # Global styles
│   ├── Navigation.scss         # Navbar styles
│   ├── HomePage.scss           # Hero & card styles
│   ├── StudentCard.scss        # Student card styles
│   ├── StudentForm.scss        # Form styles
│   ├── StudentsPage.scss       # Page styles
│   └── AboutPage.scss          # About page styles
│
├── App.jsx                      # Main app with routing
├── main.jsx                     # React entry point
├── App.css                      # App-level styles
└── index.css                    # Base styles

public/                          # Static assets
package.json                     # Dependencies & scripts
vite.config.js                  # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Install all dependencies**:
```bash
npm install
```

2. **Install Sass for SCSS compilation**:
```bash
npm install -D sass
```

### Development Server

Start the development server with hot module replacement:
```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:5173
- **Network**: Check console for network URL

### Building for Production

Create an optimized build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Code Quality

Check for linting issues:
```bash
npm run lint
```

---

## 💡 Features & Functionality

### Student Management System
- ✅ **View Students** - Display all students in an organized list
- ✅ **Add Students** - Create new students with form validation
- ✅ **Edit Students** - Modify student information
- ✅ **Delete Students** - Remove students from the list
- ✅ **Real-time Validation** - Instant feedback using Yup schema
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Loading States** - Visual feedback during operations

### Form Validation Rules
| Field | Rules |
|-------|-------|
| Name | Required, minimum 3 characters |
| Email | Required, valid email format |
| Student ID | Required, format: SE + 6 digits (SE172330) |
| GPA | Required, number between 0 and 4.0 |

### User Experience
- Responsive design for mobile, tablet, and desktop
- Smooth transitions and hover effects
- Loading spinners during async operations
- Toast-like success and error notifications
- Intuitive navigation with breadcrumbs
- Accessibility considerations

---

## 📊 Sample Data

The application includes mock student data:

| Name | Email | Student ID | GPA |
|------|-------|-----------|-----|
| Nguyễn Văn A | a@fpt.edu.vn | SE172001 | 3.8 |
| Trần Thị B | b@fpt.edu.vn | SE172002 | 3.5 |
| Lê Văn C | c@fpt.edu.vn | SE172003 | 3.9 |

---

## 🔄 State Management Architecture

### StudentContext
Global state provider for:
```javascript
{
  students: [],              // Array of student objects
  addStudent: (student) => {},
  updateStudent: (id, data) => {},
  deleteStudent: (id) => {},
  loading: false,            // API loading state
  setLoading: (bool) => {},
  error: null,               // Error messages
  setError: (msg) => {}
}
```

### Component State Flow
```
App (StudentProvider)
  └── Router
      ├── Navigation
      ├── HomePage
      ├── StudentsPage (uses StudentContext)
      ├── AddStudentPage (uses StudentContext)
      └── AboutPage
```

---

## 🎨 Design System

### Color Palette
```css
Primary Blue:     #0d6efd (Bootstrap)
Success Green:    #198754
Danger Red:       #dc3545
Warning Yellow:   #ffc107
Info Cyan:        #0dcaf0
Light Gray:       #f8f9fa
Dark Text:        #212529
```

### Typography
- **Font Family**: System fonts (Segoe UI, Roboto, Ubuntu, sans-serif)
- **Headings**: Bold, responsive sizes
- **Body**: 16px base size, 1.5 line-height
- **Code**: Monospace fonts (Courier New)

### Responsive Breakpoints
```scss
$breakpoint-md: 768px   // Tablets
$breakpoint-lg: 992px   // Desktops
```

---

## 🔗 API Service Layer

### studentService.js Methods
```javascript
getStudents()              // Fetch all students
getStudentById(id)         // Fetch single student
createStudent(data)        // Add new student
updateStudent(id, data)    // Modify student
deleteStudent(id)          // Remove student
```

All methods return Promises with mock delays (300-500ms).

---

## 🧪 Custom Hooks

### useForm
```javascript
const form = useForm(
  initialValues,
  onSubmit,
  validate
);

// Returns: values, errors, touched, isSubmitting, 
//          handleChange, handleBlur, handleSubmit, resetForm
```

### useFetch
```javascript
const { data, loading, error, refetch } = useFetch(url);

// Returns: fetched data, loading state, error, refetch function
```

---

## 🐛 Troubleshooting

### Port Already in Use
Vite automatically finds the next available port if 5173 is busy.

### SCSS Errors
Ensure Sass is installed:
```bash
npm install -D sass
```

### Build Errors
Clear and reinstall dependencies:
```bash
rm -r node_modules package-lock.json
npm install
npm install -D sass
```

### Component Not Rendering
Check React Router paths and ensure components are properly exported.

---

## 📚 Educational Resources

### Official Documentation
- [React 19 Docs](https://react.dev/)
- [React Router v7](https://reactrouter.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap 5](https://getbootstrap.com/docs/5.0/)
- [Sass Documentation](https://sass-lang.com/documentation)
- [Axios Guide](https://axios-http.com/docs/intro)
- [Yup Validation](https://github.com/jquense/yup)

### Key Concepts Covered
1. ✅ Component composition and prop drilling
2. ✅ React Hooks and custom hooks
3. ✅ Context API for state management
4. ✅ Client-side routing with React Router
5. ✅ Form handling and validation
6. ✅ Async data fetching with Axios
7. ✅ CSS preprocessor features
8. ✅ Responsive design patterns
9. ✅ Error handling and loading states
10. ✅ Project organization and best practices

---

## ✨ Learning Outcomes

After completing this project, you will be proficient in:

- Building modular, reusable React components
- Managing component and global state with hooks
- Creating multi-page applications with routing
- Designing responsive UIs with Bootstrap
- Writing maintainable styles with SCSS
- Making HTTP requests and handling async operations
- Form validation and error handling
- Organizing large React projects
- Following React best practices and patterns

---

## 📝 Notes for Instructors

This project fulfills all requirements for labs 1-6:
- **Lab 1**: Component files in `src/components/`
- **Lab 2**: Custom hooks in `src/hooks/`, Context in `src/context/`
- **Lab 3**: Routes in `App.jsx`, pages in `src/pages/`
- **Lab 4**: React Bootstrap usage throughout the application
- **Lab 5**: SCSS files in `src/styles/` with variables, mixins, nesting
- **Lab 6**: API service in `src/services/`, Axios usage, async handling

---

## 📄 License

Created for educational purposes as part of FER202 course at FPT University.

---

## 👨‍💻 Student Information

- **Student ID**: SE172330
- **Course**: FER202 - Frontend Development with React
- **University**: FPT University
- **Semester**: Summer 2026

---

**Happy Coding and Learning! 🚀**
