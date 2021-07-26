# ProjectTwo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Work Order Management System for an Auto Mechanic Company
- An employee can fill out a work order for a customer's vehicle
    - Information needed: 
        - Car information (make, model, year, mileage)
        - Customer information: (name, phone number, email address (?))
        - Customer problem description
        - Employee's assessment of work needed (Parts and Labor required)
        - Work order submission date?
        - Estimated completion date and time
        - Cost estimated with following formula:
            > (number of hours * hourly rate) + part cost * 1.5 = total cost
            - Diagnostic work will have a pre-determined hourly rate
            - Employee can void the cost of diagnostics if desired
- When work order is made, the customer must approve or deny the work to be done
- After the work has been done, an employee then confirms that the work order is complete, and the customer is billed for the agreed amount
- Employees can view completed and in-progress work orders for a customer's vehicles
- Employees can view the work history for a vehicle
- Employees can view the business history for the customer

# Technology
- Angular
- TypeScript
- Dependency Injection
- HttpClient
- Observables
