package org.example.llm.Member.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "StockMeta")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockMeta {

    @Id
    @Column(name = "Symbol", length = 10)
    private String symbol;

    @Column(name = "National", length = 10)
    private String national;

    @Column(name = "Name", length = 100)
    private String name;

    @Column(name = "Keywords", length = 200)
    private String keywords;

    // Getters and Setters (생략 가능)
}
