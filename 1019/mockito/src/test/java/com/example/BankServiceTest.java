package com.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;

class BankServiceTest {

    private NotificationService notificationService;
    private BankService bankService;
    private BankAccount account;

    @BeforeEach
    void setUp() {
        notificationService = mock(NotificationService.class);
        bankService = new BankService(notificationService);
        account = new BankAccount();
    }

    @Test
    void depositIncreasesBalance() {
        bankService.deposit(account, 1000);

        assertEquals(1000.0, account.getBalance());
    }

    @Test
    void depositSendsNotification() {
        bankService.deposit(account, 1000);

        verify(notificationService).send("Deposit successful");
    }

    @Test
    void everyDepositSendsItsOwnNotification() {
        bankService.deposit(account, 1000);
        bankService.deposit(account, 500);

        assertEquals(1500.0, account.getBalance());
        verify(notificationService, times(2)).send("Deposit successful");
    }

    @ParameterizedTest
    @ValueSource(doubles = {-100, 0, Double.NaN})
    void failedDepositSendsNoNotification(double amount) {
        assertThrows(
                IllegalArgumentException.class,
                () -> bankService.deposit(account, amount)
        );

        assertEquals(0.0, account.getBalance());
        verifyNoInteractions(notificationService);
    }
}
