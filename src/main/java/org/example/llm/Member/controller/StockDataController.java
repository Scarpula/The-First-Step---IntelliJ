package org.example.llm.Member.controller;

import org.example.llm.Member.Entity.AggregatedDataset;
import org.example.llm.Member.Entity.StockMeta;
import org.example.llm.Member.Repository.StockMetaRepository;
import org.example.llm.Member.service.AggregatedDatasetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
public class StockDataController {

    @Autowired
    private AggregatedDatasetService service;

    @GetMapping("/api/stock-data")
    public ResponseEntity<List<AggregatedDataset>> getStockData(
            @RequestParam("companyName") String companyName,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) throws ParseException {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date start = dateFormat.parse(startDate);
        Date end = dateFormat.parse(endDate);

        List<AggregatedDataset> data = service.getStockDataByCompanyNameAndDateRange(companyName, start, end);
        return ResponseEntity.ok(data);
    }
    @ExceptionHandler(ParseException.class)
    public ResponseEntity<String> handleParseException(ParseException ex) {
        return ResponseEntity.badRequest().body("Invalid date format: " + ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        return ResponseEntity.status(500).body("Internal Server Error: " + ex.getMessage());
    }
}