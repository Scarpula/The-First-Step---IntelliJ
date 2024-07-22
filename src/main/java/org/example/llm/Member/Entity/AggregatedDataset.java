package org.example.llm.Member.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "AggregatedDataset") // 대소문자를 정확히 지정
public class AggregatedDataset {
    @Id
    @Column(name = "asset_id")
    @JsonProperty("asset_id")
    private int assetId;

    @Column(name = "asset_name", length = 100)
    @JsonProperty("asset_name")
    private String assetName;

    @Column(name = "trade_date")
    @JsonProperty("trade_date")
    private Date tradeDate;

    @Column(name = "close")
    @JsonProperty("close")
    private BigDecimal close;

    @Column(name = "open")
    @JsonProperty("open")
    private BigDecimal open;

    @Column(name = "high")
    @JsonProperty("high")
    private BigDecimal high;

    @Column(name = "low")
    @JsonProperty("low")
    private BigDecimal low;

    @Column(name = "volume")
    @JsonProperty("volume")
    private long volume;

    @Column(name = "exchange", length = 100)
    @JsonProperty("exchange")
    private String exchange;

    @Column(name = "asset_type", length = 100)
    @JsonProperty("asset_type")
    private String assetType;

    @Column(name = "national", length = 100)
    @JsonProperty("national")
    private String national;

    // Getters and Setters
    public int getAssetId() {
        return assetId;
    }

    public void setAssetId(int assetId) {
        this.assetId = assetId;
    }

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public Date getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(Date tradeDate) {
        this.tradeDate = tradeDate;
    }

    public BigDecimal getClose() {
        return close;
    }

    public void setClose(BigDecimal close) {
        this.close = close;
    }

    public BigDecimal getOpen() {
        return open;
    }

    public void setOpen(BigDecimal open) {
        this.open = open;
    }

    public BigDecimal getHigh() {
        return high;
    }

    public void setHigh(BigDecimal high) {
        this.high = high;
    }

    public BigDecimal getLow() {
        return low;
    }

    public void setLow(BigDecimal low) {
        this.low = low;
    }

    public long getVolume() {
        return volume;
    }

    public void setVolume(long volume) {
        this.volume = volume;
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public String getNational() {
        return national;
    }

    public void setNational(String national) {
        this.national = national;
    }
}