# Order Processing System - Discount Calculation

This project involves implementing and debugging a discount calculation feature for an order processing system.

## Setup

1.  Ensure you have Python 3.8 or higher installed.
2.  Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Linux/macOS
    venv\Scripts\activate  # On Windows
    ```
3.  Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Running the code

You can run the discount calculation directly:

```bash
python src/main.py
```

## Running the Tests

To execute the test suite, use the following command:

```bash
pytest
```

## Task

1.  Implement the missing logic in the `calculate_discount` function in `src/discount_calculator.py` to correctly apply the discount based on customer membership and order total.
2.  Identify and fix any bugs in the provided code, focusing on edge cases and potential errors in discount calculation.
3.  Ensure all test cases pass successfully. Add additional test cases if you deem necessary to cover other scenarios.
