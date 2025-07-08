import pytest
from src.discount_calculator import calculate_discount


def test_no_discount():
    assert calculate_discount(1, False, 50) == 50


def test_member_discount():
    assert calculate_discount(2, True, 50) == 45  # 10% discount


def test_order_over_100():
    assert calculate_discount(3, False, 120) == 102.0 # 15% discount


def test_member_and_order_over_100():
    assert calculate_discount(4, True, 120) == 90.0 # Member (10%) + Order over 100 (15%) = 25%?  This is wrong.


def test_order_over_500():
    assert calculate_discount(5, False, 600) == 450.0 # 25% discount

def test_member_and_order_over_500():
    assert calculate_discount(6, True, 600) == 400.0 #Incorrect math


def test_zero_order():
    assert calculate_discount(7, True, 0) == 0.0
