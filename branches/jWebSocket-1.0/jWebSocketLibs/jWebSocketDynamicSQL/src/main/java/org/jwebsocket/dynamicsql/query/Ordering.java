package org.jwebsocket.dynamicsql.query;

/**
 * Enumeration representing the direction of an ordering clause.
 *
 * @author markos
 */
public enum Ordering {

	ASCENDING(" ASC"),
	DESCENDING(" DESC");
	private final String mDirStr;

	private Ordering(String aDirStr) {
		mDirStr = aDirStr;
	}

	@Override
	public String toString() {
		return mDirStr;
	}
}
