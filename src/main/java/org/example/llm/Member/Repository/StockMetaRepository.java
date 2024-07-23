package org.example.llm.Member.Repository;

import org.example.llm.Member.Entity.StockMeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockMetaRepository extends JpaRepository<StockMeta, String> {
    @Query("SELECT s FROM StockMeta s WHERE s.keywords LIKE %:keyword%")
    List<StockMeta> findByKeyword(@Param("keyword") String keyword);
}

