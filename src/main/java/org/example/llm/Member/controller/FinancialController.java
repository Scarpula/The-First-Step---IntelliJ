package org.example.llm.Member.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class FinancialController {

    @Value("${api.key}")
    private String apiKey;

    private final String BASE_URL = "https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json";

    @GetMapping("/financials")
    public ResponseEntity<String> getFinancials(
            @RequestParam String corp_code,
            @RequestParam String bsns_year,
            @RequestParam String reprt_code) {

        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL + "?crtfc_key=" + apiKey +
                "&corp_code=" + corp_code +
                "&bsns_year=" + bsns_year +
                "&reprt_code=" + reprt_code +
                "&fs_div=CFS";

        String result = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(result);
    }
}
