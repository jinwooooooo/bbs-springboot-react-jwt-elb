package lotte.com.a;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{

	@Override
	public void addCorsMappings(CorsRegistry registry) {

		registry.addMapping("/**").allowedOrigins("http://localhost:8090","http://kjw-bbs-frontend.ap-northeast-2.elasticbeanstalk.com");
	//	registry.addMapping("/**").allowedOrigins("*");
	}

	
}
