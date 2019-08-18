package utils;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * 
 * JSON 序列格式化日期
 * 
 * @author <a href="mailto:1772849305@qq.com">Dreamcatcher</a>
 * 
 * @version 1.0
 * 
 */
public class MyDateSerializer extends JsonSerializer<Timestamp> {

	@Override
	public void serialize(Timestamp value, JsonGenerator jgen, SerializerProvider provider)
			throws IOException, JsonProcessingException {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateStr = dateFormat.format(value);
		jgen.writeString(dateStr);
	}

}
