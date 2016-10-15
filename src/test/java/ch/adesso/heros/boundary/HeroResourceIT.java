package ch.adesso.heros.boundary;

import com.airhacks.rulz.jaxrsclient.JAXRSClientProvider;
import org.junit.Rule;
import org.junit.Test;

import javax.ws.rs.core.Response;

import static com.airhacks.rulz.jaxrsclient.JAXRSClientProvider.buildWithURI;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class HeroResourceIT {

    @Rule
    public JAXRSClientProvider commandProvider = buildWithURI("http://localhost:8282/hero-commandProvider/resources/heros");

    @Test
    public void read() {
        Response response = commandProvider.target().request().get();
        assertThat(response.getStatus(), is(200));
    }

}
