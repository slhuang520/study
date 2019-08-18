package servlet;

import Dao.NavDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.Nav;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import utils.JDBCUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class AdminServlet extends HttpServlet {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = -8444042435354356338L;


	/**
	 * The doGet method of the servlet. <br>
	 * 
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		this.doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 * 
	 * This method is called when a form has its tag value method equals to
	 * post.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String methodName = request.getParameter("method");
		Connection connection = null;

		try {
			connection = JDBCUtils.getConnection();
			Method method = getClass().getDeclaredMethod(methodName, Connection.class, HttpServletRequest.class,
					HttpServletResponse.class);
			method.invoke(this, connection, request, response);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				JDBCUtils.release(connection);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

	}

	public void searchNav(Connection connection, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		System.out.println("searchNav start....");
		String id = request.getParameter("id");
		if (id == null || "".equals(id)) {
			id = "0";
		}
		String sql = "select * from t_nav where nid = ?";
		NavDao navDao = new NavDao();
		List<Nav> navs = navDao.queryList(connection, sql, id);
		
		ObjectMapper mapper = new ObjectMapper();
		System.out.println(mapper.writeValueAsString(navs));

		response.setContentType("text/javascript;charset=UTF-8");
		response.getWriter().write(mapper.writeValueAsString(navs));
	}


	/**
	 * 需要引入包：<br>
	 * commons-codec-1.6.jar<br>
	 * commons-logging-1.1.3.jar<br>
	 * dom4j-1.6.1.jar<br>
	 * poi-3.9-20121203.jar<br>
	 * poi-ooxml-schemas-3.9-20121203.jar<br>
	 * poi-ooxml-schemas-3.9-20121203.jar<br>
	 * xmlbeans-2.6.0.jar<br>
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void outputExcel(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		OutputStream os = null;
		// 清空输出流
		response.reset();
		// 取得输出流
		os = response.getOutputStream();
		String fileName = "Excle文档";
		String suffix = ".xls";
		suffix = ".xlsx";

		// 定义输出类型
		response.setContentType("application/msexcel;charset=UTF-8");
		// 设定输出文件头
		//response.setHeader("content-disposition",
		//		"attachment;filename=" + URLEncoder.encode(fileName, "ISO-8859-1") + suffix);
		response.setHeader("content-disposition",
				"attachment;filename=" + new String(fileName.getBytes("UTF-8"), "ISO-8859-1") + suffix);
		response.setCharacterEncoding("UTF-8");

		// 根据后缀名生成 workbook
		Workbook workbook = null;
		if (".xls".equals(suffix)) {
			// 2007 以前
			workbook = new HSSFWorkbook();
		} else {
			// 2007 ~ 2013
			workbook = new XSSFWorkbook();
		}

		Sheet sheet1 = workbook.createSheet("first");

		Row row1 = sheet1.createRow(0);
		//设置行高
		//row1.setHeight((short) 7);
		row1.setHeightInPoints(50);
		
		// CellStyle style = getStyle(workbook);
		Cell cell11 = row1.createCell(0, Cell.CELL_TYPE_STRING);
		// cell1.setCellStyle(style);
		cell11.setCellValue("test1");

		Cell cell12 = row1.createCell(1, Cell.CELL_TYPE_NUMERIC);
		cell12.setCellValue(10);
		Cell cell13 = row1.createCell(2, Cell.CELL_TYPE_NUMERIC);
		cell13.setCellValue(5);
		
		Cell cell14 = row1.createCell(3, Cell.CELL_TYPE_FORMULA);
		cell14.setCellFormula("sum(B1:C1)");
		
		Sheet sheet2 = workbook.createSheet("second");
		Row row2 = sheet2.createRow(0);
		Cell cell2 = row2.createCell(0, Cell.CELL_TYPE_STRING);
		// cell2.setCellStyle(style);
		cell2.setCellValue("test2");

		// 设置列宽
		sheet1.setColumnWidth(1, 6000);
		// 自动列宽
		sheet1.autoSizeColumn(2);

		//移动行，将 3-6行向下移动2行
		sheet2.shiftRows(2, 5, 2);
		//拆分窗口
		//1000:左侧的宽度 4000：上侧的高度 3：右侧开始显示的列的索引  4：下侧开始显示的行的索引  0：激活的面板区
		sheet2.createSplitPane(1000, 4000, 3, 4, 0);
		
		//冻结窗口
		//1： 左侧列数  2：上侧行数  3：右侧开始显示的列的索引  4：下侧开始显示的行的索引
		sheet2.createFreezePane(1, 2, 3, 4);
		
		//CellRangeAddress range = new CellRangeAddress(firstRow, lastRow, firstCol, lastCol)
		//sheet2.addMergedRegion(range);
		
		workbook.write(os);
		os.flush();
		os.close();

	}

	private CellStyle getStyle(Workbook workbook) {
		CellStyle style = workbook.createCellStyle();
		style.setAlignment(CellStyle.ALIGN_CENTER);
		style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		// 设置单元格字体
		Font headerFont = workbook.createFont(); // 字体
		headerFont.setFontHeightInPoints((short) 14);
		headerFont.setColor(HSSFColor.RED.index);
		headerFont.setFontName("宋体");
		headerFont.setItalic(true); //斜体
		style.setFont(headerFont);
		style.setWrapText(true);

		// 设置单元格边框及颜色
		style.setBorderBottom((short) 1);
		style.setBorderLeft((short) 1);
		style.setBorderRight(HSSFCellStyle.BORDER_DOUBLE);
		style.setBorderTop((short) 1);
		style.setTopBorderColor(HSSFColor.BLUE.index);
		//背景色
		style.setFillBackgroundColor(HSSFColor.GREEN.index);
		//前景色
		style.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
		

		// 设置日期格式
		DataFormat dataFormat = workbook.createDataFormat();
		// style.setDataFormat(dataFormat.getFormat("yyyy-MM-dd HH:ss:mm"));

		// 设置 double 格式
		style.setDataFormat(dataFormat.getFormat("#,###.00"));
		
		//设置旋转
		style.setRotation((short) -30);


		return style;
	}

	/**
	 * Initialization of the servlet. <br>
	 * 
	 * @throws ServletException
	 *             if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
