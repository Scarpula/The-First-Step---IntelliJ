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
            @RequestParam("corp_code") String corpCode,
            @RequestParam("bsns_year") String bsnsYear,
            @RequestParam("reprt_code") String reprtCode) {

        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL + "?crtfc_key=" + apiKey +
                "&corp_code=" + corpCode +
                "&bsns_year=" + bsnsYear +
                "&reprt_code=" + reprtCode +
                "&fs_div=CFS";

        String result = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(result);
    }

}
