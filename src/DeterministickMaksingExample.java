import com.github.javafaker.Faker;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.math.BigInteger;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class DeterministicMaskingExample {

    private static final Faker faker = new Faker();
    private static final Map<String, String> nameLookup = new HashMap<>();
    private static final Map<String, String> addressLookup = new HashMap<>();
    private static final Map<String, String> faxLookup = new HashMap<>();
    private static final String HASH_ALGORITHM = "SHA-256";

    // Deterministic masking (hashing)
    private static String hashMask(String originalValue) {
        if (originalValue == null) {
            return null;
        }
        try {
            MessageDigest digest = MessageDigest.getInstance(HASH_ALGORITHM);
            byte[] hashBytes = digest.digest(originalValue.getBytes(StandardCharsets.UTF_8));
            return String.format("%064x", new BigInteger(1, hashBytes));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Lookup Table Masking
    private static String maskName(String originalName) {
        if (originalName == null) {
            return null;
        }
        return nameLookup.computeIfAbsent(originalName, k -> faker.name().fullName());
    }

    private static String maskAddress(String originalAddress) {
        if (originalAddress == null) {
            return null;
        }
        return addressLookup.computeIfAbsent(originalAddress, k -> faker.address().streetAddress());
    }

    private static String maskFax(String originalFax) {
        if (originalFax == null) {
            return null;
        }
        return faxLookup.computeIfAbsent(originalFax, k -> faker.phoneNumber().phoneNumber()); // or another appropriate fake number
    }

    // Generate UPDATE statement for a row
    public static String generateUpdateStatement(ResultSet rs, String tableName, String primaryKeyColumn) throws SQLException {
        int primaryKey = rs.getInt(primaryKeyColumn);
        String originalName = rs.getString("name");
        String originalAddress = rs.getString("address");
        String originalFax = rs.getString("fax");

        String maskedName = maskName(originalName);
        String maskedAddress = maskAddress(originalAddress);
        String maskedFax = maskFax(originalFax);

        return String.format("UPDATE %s SET name = '%s', address = '%s', fax = '%s' WHERE %s = %d;",
                tableName, maskedName, maskedAddress, maskedFax, primaryKeyColumn, primaryKey);
    }

    //Example of usage.
    public static void processResultSet(ResultSet rs, String tableName, String primaryKeyColumn) throws SQLException {
        while (rs.next()) {
            String updateStatement = generateUpdateStatement(rs, tableName, primaryKeyColumn);
            System.out.println(updateStatement);
            // Execute the updateStatement using a JDBC connection
        }
    }

    public static void main(String[] args){
        //Example of result set.
        //Use a real result set in a real world application.
        //ResultSet rs = ...
        //processResultSet(rs, "my_table", "id");
    }
}