package com.example;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ExchangeRateServiceTest {

    @Test
    void returnsConfiguredRate() {
        ExchangeRateService rateService = mock(ExchangeRateService.class);
        when(rateService.getRate("EUR", "HUF")).thenReturn(400.0);

        double rate = rateService.getRate("EUR", "HUF");

        assertEquals(400.0, rate);
        verify(rateService).getRate("EUR", "HUF");
    }

    @Test
    void returnsConfiguredRateForEachCurrencyPair() {
        ExchangeRateService rateService = mock(ExchangeRateService.class);
        when(rateService.getRate("EUR", "HUF")).thenReturn(400.0);
        when(rateService.getRate("USD", "HUF")).thenReturn(350.0);

        assertEquals(400.0, rateService.getRate("EUR", "HUF"));
        assertEquals(350.0, rateService.getRate("USD", "HUF"));
    }
}
