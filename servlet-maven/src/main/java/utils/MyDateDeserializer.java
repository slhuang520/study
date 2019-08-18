package utils;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

/**
 * JSON 反序列格式化日期
 * 
 * @author
 * 		<a href="mailto:1772849305@qq.com">Dreamcatcher</a>
 *
 * @version
 * 		1.0
 *
 */
public class MyDateDeserializer extends JsonDeserializer<Timestamp> {

	@Override
	public Timestamp deserialize(JsonParser jp, DeserializationContext ctxt)
			throws IOException, JsonProcessingException {
			String value = jp.getValueAsString();  
	        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	        try {  
	            return (Timestamp) dateFormat.parse(value);  
	        } catch (ParseException e) {  
	            e.printStackTrace();  
	        }  
	        return null;  
	}

}
