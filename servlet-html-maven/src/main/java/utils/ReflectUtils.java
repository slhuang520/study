package utils;

import java.lang.reflect.*;

/**
 * 反射工具类
 * 
 * @author <a href="mailto:1772849305@qq.com">Dreamcatcher</a>
 * 
 * @version 1.0
 */
public abstract class ReflectUtils {

	/**
	 * 通过反射，获取定义 Class 时，声明的父类的泛型参数的类型
	 * 
	 * <pre>
	 * public UserDao extends BaseDao<UserDao, List<String>>
	 * </pre>
	 * 
	 * @param clazz
	 *            当前定义的 Class
	 * 
	 * @param index
	 *            第几个参数
	 * 
	 * @return 父类的泛型参数的类型
	 */
    public static Class<?> getSupperClassGenericType(Class<?> clazz, int index) {

		Type type = clazz.getGenericSuperclass();

		// 如果当前 Class 的父类不是泛型类，直接返回 Object 类
		if (!(type instanceof ParameterizedType)) {
			return Object.class;
		}

		Type[] param = ((ParameterizedType) type).getActualTypeArguments();

		// 若当前参数不在此 Class 的参数列表范围内，直接返回 Object 类
		if (index >= param.length || index < 0) {
			return Object.class;
		}

		// 如果当前参数不是一个泛型参数，直接返回 Object 类
		if (!(param[index] instanceof Class<?>)) {
			return Object.class;
		}

		return (Class<?>) param[index];
	}

	/**
	 * 通过反射，获取定义 Class 时，声明的父类的泛型参数的类型
	 * 
	 * <pre>
	 * public UserDao extends BaseDao<UserDao, String>
	 * </pre>
	 * 
	 * @param clazz
	 *            当前定义的 Class
	 * 
	 * @return 父类的泛型参数的类型
	 */
    public static Class<?> getSupperClassGenericType(Class<?> clazz) {
        return getSupperClassGenericType(clazz, 0);
	}

	/**
	 * 循环向上转型，获取对象的 DeclaredField
	 * 
	 * @param object
	 *            获取 Field 的所在对象
	 * 
	 * @param fieldName
	 *            获取的 Field 名称
	 * 
	 * @return 需要获取的 Field 对象，没有找到返回 null
	 */
	public static Field getDeclaredField(Object object, String fieldName) {
		for (Class<?> clazz = object.getClass(); clazz != Object.class; clazz = clazz
				.getSuperclass()) {
			try {
				return clazz.getDeclaredField(fieldName);
            } catch (NoSuchFieldException | SecurityException ignored) {
				// 当前类没有定义该字段，继续向上转型，找父类中是否有定义
			}
		}
		return null;
	}

	/**
	 * 循环向上转型，获取 object 的 methodName 方法，该方法可能是私有方法，也可能在父类中(私有方法)
	 * 
	 * @param object
	 *            获取方法的当前对象
	 * 
	 * @param methodName
	 *            要获取的方法名称
	 * 
	 * @param parameterTypes
	 *            要获取方法的参数类型列表
	 * 
	 * @return 需要获取的 Method 对象，没有找到返回 null
	 */
	public static Method getDeclaredMethod(Object object, String methodName,
			Class<?>... parameterTypes) {
		for (Class<?> clazz = object.getClass(); clazz != Object.class; clazz = clazz
				.getSuperclass()) {
			try {
				return clazz.getDeclaredMethod(methodName, parameterTypes);
            } catch (NoSuchMethodException | SecurityException ignored) {
				// 当前类没有定义该方法，继续向上转型，找父类中是否有定义
			}
		}
		return null;
	}

	/**
	 * 执行指定 methodName 的方法(private | public 都可以),<br>
	 * 当方法没有找到时，抛出 IllegalArgumentException 异常
	 * 
	 * @param object
	 *            需要执行的方法所在的对象
	 * 
	 * @param methodName
	 *            需要执行的方法的名称
	 * 
	 * @param args
	 *            需要执行的方法的参数
	 * 
	 * @return Object 方法的返回结果，若执行出错，返回 null
	 * 
	 * @throws IllegalArgumentException
	 *             非法的参数异常
	 * 
	 * @throws InvocationTargetException
	 *             由调用方法或构造方法所抛出异常的经过检查的异常
	 */
	public static Object invokeMethod(Object object, String methodName, Object... args)
			throws IllegalArgumentException, InvocationTargetException {

		// 获取所有参数的类型
		Class<?>[] parameterTypes = new Class<?>[args.length];
		for (int i = 0; i < args.length; i++) {
			parameterTypes[i] = args[i].getClass();
		}

		// 获取当前方法
		Method method = getDeclaredMethod(object, methodName, parameterTypes);

		if (method == null) {
			throw new IllegalArgumentException("Can't find this method by name " + methodName
					+ " and parameterTypes " + parameterTypes);
		}

		// 若该方法是私有的，打开该方法的访问权限
		method.setAccessible(true);

		try {
			return method.invoke(object, args);
        } catch (IllegalAccessException ignored) {
			// 上面已经将方法设置成可访问的，所以这里不会再出现这个异常
		}
		return null;
	}

	/**
	 * 使用字段可访问
	 * 
	 * @param field
	 *            要设置的字段
	 */
	public static void makeAccessible(Field field) {
		if (field != null && !Modifier.isPublic(field.getModifiers())) {
			field.setAccessible(true);
		}
	}

	/**
	 * 设置属性的值 (private | public 都可以),<br>
	 * 当属性没有找到时，抛出 IllegalArgumentException 异常
	 * 
	 * @param object
	 *            当前属性所在的对象
	 * 
	 * @param fieldName
	 *            需要设置的属性的名称
	 * 
	 * @param fieldValue
	 *            需要设置的属性的值
	 */
	public static void setFieldValue(Object object, String fieldName, Object fieldValue) {
		Field field = getDeclaredField(object, fieldName);

		if (field == null) {
			throw new IllegalArgumentException("Can't find the Field by name " + fieldName);
		}

		makeAccessible(field);

		try {
			field.set(object, fieldValue);
        } catch (IllegalAccessException ignored) {
			// 上面已经将属性设置成可访问的，所以这里不会再出现这个异常
		}
	}

	/**
	 * 直接获取属性的值，忽略 private|protected 修饰符，也不经过 getter,<br>
	 * 当属性没有找到时，抛出 IllegalArgumentException 异常
	 * 
	 * @param object
	 *            获取值的属性所在的对象
	 * 
	 * @param fieldName
	 *            获取值的属性的名称
	 * 
	 * @return Object 需要获取的属性的值，没有取到时，返回 null
	 * 
	 */
	public static Object getFieldValue(Object object, String fieldName) {
		Field field = getDeclaredField(object, fieldName);

		if (field == null) {
			throw new IllegalArgumentException("Can't find the Field by name " + fieldName);
		}

		makeAccessible(field);

		try {
			return field.get(object);
        } catch (IllegalAccessException ignored) {
			// 上面已经将属性设置成可访问的，所以这里不会再出现这个异常
		}
		return null;
	}
}
