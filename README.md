# Gaming Store

[Polski](README.pl.md) | **English**

A responsive Angular 22 storefront demonstrating the shopping and checkout flow, including simulated HTTP failures and user-facing error states.

## Features

- Browse a product catalog
- Search products, filter by tags, and sort by price
- View individual product details
- Add, remove, and update quantities in the cart
- Enter checkout and delivery data
- Pay by BLIK, card, or bank transfer
- Generate and download an order confirmation as PDF
- View About, Contact, and Regulations pages
- Simulate HTTP errors locally through an Angular interceptor
- Display notifications with Angular Material SnackBar

## Technologies

- Angular 22
- TypeScript 6
- RxJS 7
- Angular Router
- Angular Material and Angular CDK
- PDFMake
- Vitest
- nginx
- Docker and Docker Compose

## Requirements

- Node.js 22 or newer
- npm
- Docker and Docker Compose (optional)

## Local development

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm start
```

Open:

```text
http://localhost:4200/
```

## Available scripts

| Command | Description |
|---|---|
| `npm start` | Starts the app with `ng serve` |
| `npm run build` | Creates an optimized production build |
| `npm run watch` | Builds the app in watch mode |
| `npm test` | Runs tests with the Angular unit-test builder and Vitest |

## Production build

```bash
npm run build
```

Build output is written to:

```text
dist/Project/browser/
```

## Run with Docker

The project includes a multi-stage `Dockerfile` and nginx configuration that supports Angular routing.

```bash
docker compose up --build
```

The app will be available at:

```text
http://localhost:8080/
```

Stop the container:

```bash
docker compose down
```

## Routing

| Address | View |
|---|---|
| `/` | Redirects to `/shop` |
| `/shop` | Product catalog and filters |
| `/product/:id` | Product details |
| `/cart` | Cart and checkout details |
| `/payless` | Payment selection and processing |
| `/about-us` | About the store |
| `/contact` | Contact form |
| `/regulations` | Store regulations |
| `/400` | Bad Request error page |

Unknown addresses redirect to `/shop`.

## Error simulation

The app does not require a real API. `LocalHttpSimulationService` creates local HTTP requests that are intercepted by `errorHeadersInterceptor`.

Configuration is located in:

```text
src/app/core/interceptore/error-simulation.config.ts
```

| Flag | Default value | Simulated area |
|---|---:|---|
| `INCORRECT_CART` | `0` | Adding a product to the cart |
| `INCORRECT_PAYWALL` | `0` | Payment processing |
| `INCORRECT_CONTACT` | `0` | Sending the contact form |
| `INCORRECT_PDF_GENERATOR` | `1` | PDF invoice generation |
| `LOADING_PAGE` | `0` | Initial page loading state |

A value of `1` produces an HTTP `400 Bad Request` response. A value of `0` produces an HTTP `200 OK` response. Changing a flag requires no component changes.

## Payment flow

1. The user adds products to the cart.
2. Quantities are adjusted and the checkout form is completed.
3. Customer data and the payment method are passed to `/payless`.
4. The payment form starts a local error simulation.
5. After a successful simulation, the cart is cleared and a transaction ID is generated.
6. The user can download the order confirmation as `invoice.pdf`.

## Application state

The cart is kept in memory through `CartService` signals. It does not use `localStorage`, a database, or a backend, so refreshing the page resets the cart.

## Project structure

```text
src/
├── app/
│   ├── core/
│   │   ├── interceptore/       # Error simulation config and interceptor
│   │   ├── services/           # Cart, PDF, and local HTTP simulation
│   │   └── product.ts          # Product catalog data
│   ├── features/
│   │   ├── shop/               # Catalog and filtering
│   │   ├── product-details/    # Product details
│   │   ├── cart/               # Cart and checkout details
│   │   ├── payless/            # Payment and PDF
│   │   ├── contact/            # Contact form
│   │   ├── about/              # About the store
│   │   ├── regulations/        # Store regulations
│   │   └── bad-request-component/
│   ├── models/                 # Product and cart item models
│   ├── app.routes.ts
│   └── app.config.ts
└── public/
    └── images/                 # Product images and logo
```
