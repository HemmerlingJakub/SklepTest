# Gaming Store

**Polski** | [English](README.md)

Responsywny sklep internetowy oparty na Angular 22, prezentujący proces zakupowy i płatności oraz lokalnie symulowane błędy HTTP.

## Funkcje

- przeglądanie katalogu produktów,
- wyszukiwanie produktów, filtrowanie po tagach i sortowanie po cenie,
- strona szczegółów każdego produktu,
- koszyk z możliwością zmiany ilości i usunięcia pozycji,
- formularz danych zamówienia,
- płatność metodami BLIK, kartą lub przelewem,
- generowanie i pobieranie potwierdzenia zamówienia w PDF,
- strony informacyjne: o sklepie, kontakt i regulamin,
- lokalna symulacja błędów HTTP za pomocą Angular interceptor,
- obsługa powiadomień przez Angular Material SnackBar.

## Technologie

- Angular 22
- TypeScript 6
- RxJS 7
- Angular Router
- Angular Material i Angular CDK
- PDFMake
- Vitest
- nginx
- Docker i Docker Compose

## Wymagania

- Node.js 22 lub nowszy
- npm
- opcjonalnie Docker oraz Docker Compose

## Uruchomienie lokalne

Zainstaluj zależności:

```bash
npm ci
```

Uruchom aplikację w trybie development:

```bash
npm start
```

Po uruchomieniu otwórz:

```text
http://localhost:4200/
```

## Dostępne skrypty

| Polecenie | Opis |
|---|---|
| `npm start` | uruchamia aplikację przez `ng serve` |
| `npm run build` | tworzy zoptymalizowaną wersję produkcyjną |
| `npm run watch` | buduje aplikację w trybie watch |
| `npm test` | uruchamia testy przez Angular unit-test builder i Vitest |

## Build produkcyjny

```bash
npm run build
```

Pliki aplikacji zostaną zapisane w katalogu:

```text
dist/Project/browser/
```

## Uruchomienie przez Docker

Projekt zawiera wieloetapowy `Dockerfile` oraz konfigurację nginx obsługującą routing Angular.

```bash
docker compose up --build
```

Aplikacja będzie dostępna pod adresem:

```text
http://localhost:8080/
```

Aby zatrzymać kontener:

```bash
docker compose down
```

## Routing

| Adres | Widok |
|---|---|
| `/` | przekierowanie do `/shop` |
| `/shop` | katalog i filtry produktów |
| `/product/:id` | szczegóły produktu |
| `/cart` | koszyk i dane zamówienia |
| `/payless` | wybór i realizacja płatności |
| `/about-us` | informacje o sklepie |
| `/contact` | formularz kontaktowy |
| `/regulations` | regulamin |
| `/400` | strona błędu Bad Request |

Nieznane adresy są przekierowywane do `/shop`.

## Symulacja błędów

Błędy nie wymagają prawdziwego API. `LocalHttpSimulationService` tworzy lokalne żądania HTTP, które przechwytuje `errorHeadersInterceptor`.

Konfiguracja znajduje się w:

```text
src/app/core/interceptore/error-simulation.config.ts
```

| Flaga | Wartość domyślna | Symulowany obszar |
|---|---:|---|
| `INCORRECT_CART` | `0` | dodawanie produktu do koszyka |
| `INCORRECT_PAYWALL` | `0` | obsługa płatności |
| `INCORRECT_CONTACT` | `0` | wysłanie formularza kontaktowego |
| `INCORRECT_PDF_GENERATOR` | `0` | generowanie faktury PDF |
| `LOADING_PAGE` | `0` | błędny stan początkowego ładowania strony |

Wartość `1` powoduje zwrócenie odpowiedzi HTTP `400 Bad Request`, a wartość `0` - odpowiedzi `200 OK`. Po zmianie flagi aplikacja automatycznie używa nowego ustawienia bez potrzeby zmian w komponentach.

## Przepływ płatności

1. Użytkownik dodaje produkty do koszyka.
2. W koszyku ustala ilości i przechodzi do formularza danych.
3. Dane klienta i metoda płatności są przekazywane do widoku `/payless`.
4. Formularz płatności uruchamia lokalną symulację błędu.
5. Po poprawnej symulacji koszyk jest czyszczony i generowane jest ID transakcji.
6. Użytkownik może pobrać potwierdzenie zamówienia jako `invoice.pdf`.

## Stan aplikacji

Koszyk jest przechowywany w pamięci Angular przez sygnały `CartService`. Nie wykorzystuje `localStorage`, bazy danych ani backendu - odświeżenie strony resetuje zawartość koszyka.

## Struktura projektu

```text
src/
├── app/
│   ├── core/
│   │   ├── interceptore/       # config i interceptor symulowanych błędów
│   │   ├── services/           # koszyk, PDF i lokalna symulacja HTTP
│   │   └── product.ts          # dane katalogu
│   ├── features/
│   │   ├── shop/               # katalog i filtrowanie
│   │   ├── product-details/    # szczegóły produktu
│   │   ├── cart/               # koszyk i dane zamówienia
│   │   ├── payless/            # płatności i PDF
│   │   ├── contact/            # formularz kontaktowy
│   │   ├── about/              # o sklepie
│   │   ├── regulations/        # regulamin
│   │   └── bad-request-component/
│   ├── models/                 # modele produktu i pozycji koszyka
│   ├── app.routes.ts
│   └── app.config.ts
└── public/
    └── images/                 # obrazy produktów i logo
```
