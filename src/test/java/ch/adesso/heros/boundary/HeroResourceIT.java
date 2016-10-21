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
    public JAXRSClientProvider commandProvider = buildWithURI(getURI());

    public String getURI() {
        String host = "localhost";
        String kubernetesHost = EnvironmentVariableGetter.getEnv("KUBERNETES_HOST_NAME");
        if (kubernetesHost != null && !kubernetesHost.isEmpty()) {
            host = kubernetesHost;
        }
        return "http://" + host + ":8282/hero-command/resources/heros";
    }

    @Test
    public void isRunning() {
        Response response = commandProvider.target().request().get();
        assertThat(response.getStatus(), is(200));
    }

}
