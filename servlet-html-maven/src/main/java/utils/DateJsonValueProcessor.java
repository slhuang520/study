package utils;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateJsonValueProcessor implements JsonValueProcessor {

    private static final String FORMAT = "yyyy-MM-dd HH:MM:SS";
    private DateFormat dateFormat;

    public DateJsonValueProcessor() {
        this(FORMAT);
    }

    public DateJsonValueProcessor(String format) {
        try {
            dateFormat = new SimpleDateFormat(format);
        } catch (Exception e) {
            dateFormat = new SimpleDateFormat(FORMAT);
        }
    }

    @Override
    public Object processArrayValue(Object o, JsonConfig jsonConfig) {
        return null;
    }

    @Override
    public Object processObjectValue(String key, Object value, JsonConfig jsonConfig) {
        if (value == null) {
            return "";
        }

        if (value instanceof java.sql.Timestamp) {
            return dateFormat.format((java.sql.Timestamp) value);
        }

        if (value instanceof java.util.Date) {
            return dateFormat.format((Date) value);
        }

        return value.toString();
    }
}
