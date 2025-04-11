package com.hackathon.assistance.util;

import com.hackathon.assistance.exceptions.ApplicationCode;
import com.hackathon.assistance.exceptions.ApplicationException;
import io.netty.handler.codec.http.DefaultHttpHeaders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import reactor.netty.http.client.HttpClient;
import reactor.netty.tcp.TcpClient;

@Component
public class WebClientUtil {
	private final WebClient webClientBuilder;
	private static final int BUFFER_SIZE = 100 * 1024 * 1024;
	@Value("${openAi.token}")
	private String openAIToken;
	
	@Autowired
	public WebClientUtil(WebClient.Builder webClientbuilder) {
		webClientBuilder = buildWebClient("https://useapp55950.mhf.mhc:8113");
	}

    public <R, B> R execute(HttpMethod httpMethod, String Url, B requestEntity,Class<R> responseType) throws ApplicationException {
        R response = null;
		HttpHeaders headers = makeSafeHeader(HttpHeaders.AUTHORIZATION, "Bearer "+openAIToken);
		headers.setContentType(MediaType.APPLICATION_JSON);
        try {
            response = webClientBuilder.method(httpMethod)
                    .uri(Url)
					.headers(header -> header.addAll(headers))
                    .bodyValue(requestEntity)
                    .retrieve()
                    .bodyToMono(responseType)
                    .block();
        } catch (Exception ex) {
            throw new ApplicationException("Error in calling OpenAI API",
					ApplicationCode.APPLICATION_EXCEPTION,
					HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

	private HttpHeaders makeSafeHeader(String name, String value) {
		DefaultHttpHeaders safe_hdrs = new DefaultHttpHeaders();
		safe_hdrs.set(name, value);

		HttpHeaders new_hdr = new HttpHeaders();
		for (String a : safe_hdrs.names())
			new_hdr.set(a, safe_hdrs.get(name));

		return new_hdr;
	}
    
    private WebClient buildWebClient(String baseUrl) {
		try {
			SslContext sslContext = SslContextBuilder
		            .forClient()
		            .trustManager(InsecureTrustManagerFactory.INSTANCE)
		            .build();
		    TcpClient tcpClient = TcpClient.create().secure(sslContextSpec -> sslContextSpec.sslContext(sslContext));
		    HttpClient httpClient = HttpClient.create().wiretap(false).secure(t -> t.sslContext(sslContext));
			
			return WebClient.builder().baseUrl(baseUrl)
					.clientConnector(new ReactorClientHttpConnector(httpClient))
					.exchangeStrategies(ExchangeStrategies.builder()
					.codecs(configure -> configure.defaultCodecs().maxInMemorySize(BUFFER_SIZE)).build()).build();
		} catch (Exception e) {
			throw new ApplicationException("Error in calling OpenAI API",
					ApplicationCode.APPLICATION_EXCEPTION,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}