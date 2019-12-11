package io.slingr.endpoints.merchbar;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.framework.annotations.EndpointProperty;
import io.slingr.endpoints.framework.annotations.SlingrEndpoint;

/**
 * <p>Merchbar endpoint
 * <p>
 * <p>Created by hpacini on 12/11/19.
 */
@SlingrEndpoint(name = "merchbar", functionPrefix = "_")
public class MerchbarEndpoint extends HttpEndpoint {

    private static final String API_URL = "";

    @EndpointProperty
    private String username;

    @EndpointProperty
    private String password;

    public MerchbarEndpoint() {
    }

    @Override
    public String getApiUri() {
        return API_URL;
    }

    @Override
    public void endpointStarted() {
        httpService().setupBasicAuthentication(username, password);
        httpService().setupDefaultHeader("Accept", "application/json");
    }
}
