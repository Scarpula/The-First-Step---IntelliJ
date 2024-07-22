package org.example.llm.Member.Repository;

import org.example.llm.Member.Entity.AggregatedDataset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface AggregatedDatasetRepository extends JpaRepository<AggregatedDataset, Long> {
    @Query("SELECT a FROM AggregatedDataset a WHERE a.assetName = :assetName AND a.tradeDate BETWEEN :startDate AND :endDate ORDER BY a.tradeDate ASC")
    List<AggregatedDataset> findByAssetNameAndTradeDateBetween(
            @Param("assetName") String assetName,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);
}