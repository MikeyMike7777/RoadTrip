package road.trip.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lombok.extern.log4j.Log4j2;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Log4j2
@RestController
public class UserEndpoint {

    @Autowired
    private UserService userService;

    @GetMapping("/user/{email}")
    @CrossOrigin
    public User findUserById(@PathVariable String email) {
        var user = userService.findUserBy(email);
        return user.orElse(null);
    }

    @GetMapping("/user/validate/{email}/{password}")
    @CrossOrigin
    public Boolean validateUser(@PathVariable String password, @PathVariable String email) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        User user = findUserById(email);
        System.out.println(password);
        byte[] decodedKey = Base64.getDecoder().decode(user.key);
        SecretKey originalKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, "AES");
        Encryption enc = new Encryption();
        IvParameterSpec iv = enc.generateIv();
        String en = enc.encrypt("AES/CBC/PKCS5Padding", password, originalKey, iv);

        if(en.equals(user.getPassword())){
            return true;
        }

        return false;
    }

    @CrossOrigin
    @PostMapping("/user")
    public User saveUser(@RequestBody User user) throws NoSuchAlgorithmException, InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException {
        Encryption enc = new Encryption();
        SecretKey key = enc.generateKey(128);
        IvParameterSpec iv = enc.generateIv();
        String en = enc.encrypt("AES/CBC/PKCS5Padding", user.getPassword(), key, iv);
        String encodedKey = Base64.getEncoder().encodeToString(key.getEncoded());
        user.password = en;
        user.key = encodedKey;

        return userService.saveUser(user);
    }

    @CrossOrigin
    @PostMapping("/user/delete")
    public void deleteUser(@RequestBody User user) {
        userService.deleteUser(user);
    }
}
