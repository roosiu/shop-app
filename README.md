# Shop-app by Monika Sulecka - Grochowska
# Mała Doniczka - Plant Shop

## Project Description
Mała Doniczka is an e-commerce application for selling plants and plant accessories. Users can browse products, add them to their cart, register, log in, and finalize their purchases.

## Features
- Browse available products.
- Add products to the cart.
- Manage product quantities in the cart.
- Remove products from the cart.
- View cart summary with total value.
- Register new users.
- User login and logout.

## Technologies
The project is built using the following technologies:
- **React**: Library for building user interfaces.
- **Tailwind CSS**: CSS framework for styling the application.
- **Node.js** and **Express**: Application server.
- **Vite**: Build tool.
- **Chart.js**: Library for creating charts.

## Requirements
- Node.js (version 14 or higher)
- NPM (version 6 or higher) or Yarn

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/your-repository.git (the link will be active in the near future)
    ```
2. Navigate to the project directory:
    ```sh
    cd project-name
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

## Running the Project
1. Start the backend server:
    ```sh
    node app.mjs
    ```
2. Start the frontend application:
    ```sh
    npm run dev
    ```
    or
    ```sh
    yarn dev
    ```

## Project Structure
- `/public`: Static public files.
- `/src`: Source code of the frontend application.
  - `/components`: React components.
  - `/context`: React contexts.
  - `/api`: API communication files.
- `app.mjs`: Main backend server file.

## Usage
After starting the application, go to `http://localhost:3000` in your browser to see the application in action.

## Examples
### Browsing Products
Users can browse available products on the homepage and add them to their cart.

### Managing the Cart
The user's cart shows the added products, allows changing product quantities, and removing them.

### Finalizing Purchases
The cart summary displays the total value of products and an option to start placing an order.

## Validation and Authorization
- **Registration**: Email, username, and password validation.
- **Login**: Checking login data correctness and session authorization.

## Support
For issues or questions, please open an issue on [GitHub Issues](https://github.com/your-repository/issues).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
