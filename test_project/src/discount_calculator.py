def calculate_discount(customer_id, is_member, order_total):
    """Calculates the final price after applying discounts based on membership and order total."""

    discount = 0.0

    if is_member:
        discount += 0.1  # 10% discount for members

    if order_total > 100:
        discount = 0.15 # 15% discount for orders over $100 (applied *after* member discount, should be additive)

    if order_total > 500:
        discount = 0.25 # 25% discount for orders over $500


    final_price = order_total * (1 - discount)
    return final_price
