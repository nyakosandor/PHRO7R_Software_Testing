package org.example;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class BankAccountTest {

    private BankAccount account;

    @BeforeEach
    void setUp() {
        account = new BankAccount();
    }

    @Test
    void newAccountHasZeroBalance() {
        assertEquals(0, account.getBalance());
    }

    @Test
    void depositIncreasesBalance() {
        account.deposit(1000);

        assertEquals(1000, account.getBalance());
    }

    @Test
    void multipleDepositsAddUp() {
        account.deposit(1000);
        account.deposit(500);
        account.deposit(250);

        assertEquals(1750, account.getBalance());
    }

    @Test
    void depositAcceptsFractionalAmount() {
        account.deposit(0.1);
        account.deposit(0.2);

        assertEquals(0.3, account.getBalance(), 1e-9);
    }

    @Test
    void withdrawDecreasesBalance() {
        account.deposit(1000);

        account.withdraw(300);

        assertEquals(700, account.getBalance());
    }

    @Test
    void fullBalanceCanBeWithdrawn() {
        account.deposit(1000);

        account.withdraw(1000);

        assertEquals(0, account.getBalance());
    }

    @Test
    void withdrawingMoreThanBalanceThrowsException() {
        account.deposit(1000);

        assertThrows(
                IllegalArgumentException.class,
                () -> account.withdraw(1000.01)
        );
        assertEquals(1000, account.getBalance());
    }

    @Test
    void withdrawingFromEmptyAccountThrowsException() {
        assertThrows(
                IllegalArgumentException.class,
                () -> account.withdraw(1)
        );
        assertEquals(0, account.getBalance());
    }

    @Test
    void negativeDepositThrowsException() {
        account.deposit(1000);

        assertThrows(
                IllegalArgumentException.class,
                () -> account.deposit(-100)
        );
        assertEquals(1000, account.getBalance());
    }

    @Test
    void zeroDepositThrowsException() {
        account.deposit(1000);

        assertThrows(
                IllegalArgumentException.class,
                () -> account.deposit(0)
        );
        assertEquals(1000, account.getBalance());
    }

    @Test
    void negativeWithdrawThrowsException() {
        account.deposit(1000);

        assertThrows(
                IllegalArgumentException.class,
                () -> account.withdraw(-100)
        );
        assertEquals(1000, account.getBalance());
    }

    @Test
    void zeroWithdrawThrowsException() {
        account.deposit(1000);

        assertThrows(
                IllegalArgumentException.class,
                () -> account.withdraw(0)
        );
        assertEquals(1000, account.getBalance());
    }

    @ParameterizedTest
    @ValueSource(doubles = {Double.NaN, Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY})
    void nonFiniteDepositThrowsException(double amount) {
        account.deposit(1000);

        assertThrows(
                IllegalArgumentException.class,
                () -> account.deposit(amount)
        );
        assertEquals(1000, account.getBalance());
    }

    @ParameterizedTest
    @ValueSource(doubles = {Double.NaN, Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY})
    void nonFiniteWithdrawThrowsException(double amount) {
        account.deposit(1000);

        assertThrows(
                IllegalArgumentException.class,
                () -> account.withdraw(amount)
        );
        assertEquals(1000, account.getBalance());
    }
}
