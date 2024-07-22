package org.example.llm.Member.service;

import org.example.llm.Member.Entity.AggregatedDataset;
import org.example.llm.Member.Repository.AggregatedDatasetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class AggregatedDatasetService {

    @Autowired
    private AggregatedDatasetRepository repository;

    public List<AggregatedDataset> getStockDataBySymbolAndDateRange(String assetName, Date startDate, Date endDate) {
        return repository.findByAssetNameAndTradeDateBetween(assetName, startDate, endDate);
    }
}
