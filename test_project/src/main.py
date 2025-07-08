from discount_calculator import calculate_discount

if __name__ == '__main__':
    customer_id = 123
    is_member = True
    order_total = 120.0

    discounted_total = calculate_discount(customer_id, is_member, order_total)

    print(f"Customer ID: {customer_id}")
    print(f"Is Member: {is_member}")
    print(f"Order Total: ${order_total:.2f}")
    print(f"Discounted Total: ${discounted_total:.2f}")
