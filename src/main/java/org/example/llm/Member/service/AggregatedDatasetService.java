package org.example.llm.Member.service;

import org.example.llm.Member.Entity.AggregatedDataset;
import org.example.llm.Member.Entity.StockMeta;
import org.example.llm.Member.Repository.AggregatedDatasetRepository;
import org.example.llm.Member.Repository.StockMetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class AggregatedDatasetService {

    @Autowired
    private AggregatedDatasetRepository repository;

    @Autowired
    private StockMetaRepository stockMetaRepository;

    public List<AggregatedDataset> getStockDataByCompanyNameAndDateRange(String companyName, Date startDate, Date endDate) {
        List<StockMeta> stockMetas = stockMetaRepository.findByKeyword(companyName);
        if (stockMetas.isEmpty()) {
            throw new RuntimeException("Company not found: " + companyName);
        }
        StockMeta stockMeta = stockMetas.get(0);  // 첫 번째 결과만 사용
        return repository.findByAssetNameAndTradeDateBetween(stockMeta.getSymbol(), startDate, endDate);
    }
}
