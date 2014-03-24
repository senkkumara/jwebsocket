//	---------------------------------------------------------------------------
//	jWebSocket Load Balancer Dialog (Community Edition, CE)
//	---------------------------------------------------------------------------
//	Copyright 2010-2014 Innotrade GmbH (jWebSocket.org)
//      Alexander Schulze, Germany (NRW)
//
//	Licensed under the Apache License, Version 2.0 (the "License");
//	you may not use this file except in compliance with the License.
//	You may obtain a copy of the License at
//
//	http://www.apache.org/licenses/LICENSE-2.0
//
//	Unless required by applicable law or agreed to in writing, software
//	distributed under the License is distributed on an "AS IS" BASIS,
//	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//	See the License for the specific language governing permissions and
//	limitations under the License.
//	---------------------------------------------------------------------------
package org.jwebsocket.lb;

import java.awt.Toolkit;
import java.util.List;
import java.util.Map;
import javolution.util.FastList;
import org.jwebsocket.client.plugins.BaseServiceTokenPlugIn;
import org.jwebsocket.client.plugins.loadbalancer.LoadBalancerPlugIn;
import org.jwebsocket.client.token.JWebSocketTokenClient;
import org.jwebsocket.kit.WebSocketException;
import org.jwebsocket.token.Token;
import org.jwebsocket.token.TokenFactory;
import org.jwebsocket.token.WebSocketResponseTokenListener;

/**
 *
 * @author Rolando Betancourt Toucet
 */
public class LoadBalancerDialog extends javax.swing.JFrame {

        private JWebSocketTokenClient mBaseClient;
        private List<BaseServiceTokenPlugIn> mServices;
        private LoadBalancerPlugIn mLBPlugIn;
        private PlugInListener mPlugInListener;
        private List<String> mServicesLoaded;
        private List<String> mNamespaceLoaded;

        /**
         * Creates new form LoadBalancerDialog
         *
         * @param aClient
         * @param aLogPanel
         */
        public LoadBalancerDialog(JWebSocketTokenClient aClient) {
                initComponents();
                mBaseClient = aClient;
                mServices = new FastList<BaseServiceTokenPlugIn>();
                mLBPlugIn = new LoadBalancerPlugIn(aClient);
                mPlugInListener = new PlugInListener();
                mServicesLoaded = new FastList<String>();
                mNamespaceLoaded = new FastList<String>();

                Log("jWebSocket Load Balancer Demo initialized");
        }

        /**
         *
         */
        private LoadBalancerDialog() {
                throw new UnsupportedOperationException("Not supported!");
        }

        /**
         * This method is called from within the constructor to initialize the
         * form. WARNING: Do NOT modify this code. The content of this method is
         * always regenerated by the Form Editor.
         */
        @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        btnEndpointInfo = new javax.swing.JButton();
        btnStickyRoutes = new javax.swing.JButton();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        cbEndpoint = new javax.swing.JComboBox();
        btnShutdownService = new javax.swing.JButton();
        btnDeregisterService = new javax.swing.JButton();
        btnCreateService = new javax.swing.JButton();
        cbClusterAlias = new javax.swing.JComboBox();
        jLabel1 = new javax.swing.JLabel();
        tfPassword = new javax.swing.JPasswordField();
        jLabel4 = new javax.swing.JLabel();
        cbAlgorithms = new javax.swing.JComboBox();
        btnTestService = new javax.swing.JButton();
        btnChoose = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setTitle("jWebSocket Load Balancer Demo");
        setAlwaysOnTop(true);
        setIconImage(Toolkit.getDefaultToolkit().getImage(getClass().getResource("/images/Synapso16x16.png")));
        setName(""); // NOI18N
        setResizable(false);
        addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowClosed(java.awt.event.WindowEvent evt) {
                formWindowClosed(evt);
            }
        });

        btnEndpointInfo.setText("EndPoints Info");
        btnEndpointInfo.setToolTipText("Detailed information about all endpoints of the clusters.");
        btnEndpointInfo.setPreferredSize(new java.awt.Dimension(110, 20));
        btnEndpointInfo.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnEndpointInfoActionPerformed(evt);
            }
        });

        btnStickyRoutes.setText("Sticky Routes");
        btnStickyRoutes.setToolTipText("Detailed information about all sticky routes ( The endpoints with status ONLINE ).");
        btnStickyRoutes.setPreferredSize(new java.awt.Dimension(110, 20));
        btnStickyRoutes.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnStickyRoutesActionPerformed(evt);
            }
        });

        jLabel2.setText("Password:");

        jLabel3.setText("EndPoint Id:");
        jLabel3.setToolTipText("");

        cbEndpoint.setModel(new javax.swing.DefaultComboBoxModel(new String[] { "-Select the cluster endpoint-" }));
        cbEndpoint.setPreferredSize(new java.awt.Dimension(56, 18));
        cbEndpoint.addFocusListener(new java.awt.event.FocusAdapter() {
            public void focusGained(java.awt.event.FocusEvent evt) {
                cbEndpointFocusGained(evt);
            }
        });

        btnShutdownService.setToolTipText("Select the cluster alias and endpoint id for do you can shutdown a specific endpoint.");
        btnShutdownService.setLabel("Shutdown Service Endpoint");
        btnShutdownService.setPreferredSize(new java.awt.Dimension(125, 20));
        btnShutdownService.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnShutdownServiceActionPerformed(evt);
            }
        });

        btnDeregisterService.setToolTipText("Select the cluster alias and endpoint id for do you can deregister a specific endpoint.");
        btnDeregisterService.setLabel("Deregister Service Endpoint");
        btnDeregisterService.setPreferredSize(new java.awt.Dimension(165, 20));
        btnDeregisterService.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnDeregisterServiceActionPerformed(evt);
            }
        });

        btnCreateService.setText("Create New Service Endpoint");
        btnCreateService.setToolTipText("Create a new service endpoint in the selected service.");
        btnCreateService.setMaximumSize(new java.awt.Dimension(100, 20));
        btnCreateService.setMinimumSize(new java.awt.Dimension(100, 20));
        btnCreateService.setPreferredSize(new java.awt.Dimension(100, 20));
        btnCreateService.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnCreateServiceActionPerformed(evt);
            }
        });

        cbClusterAlias.setModel(new javax.swing.DefaultComboBoxModel(new String[] { "-Select-" }));
        cbClusterAlias.setPreferredSize(new java.awt.Dimension(56, 18));
        cbClusterAlias.addFocusListener(new java.awt.event.FocusAdapter() {
            public void focusGained(java.awt.event.FocusEvent evt) {
                cbClusterAliasFocusGained(evt);
            }
        });

        jLabel1.setText("Select Cluster Alias:");

        tfPassword.setText("admin");

        jLabel4.setText("Select the algorithm:");

        cbAlgorithms.setModel(new javax.swing.DefaultComboBoxModel(new String[] { "Round Robin", "Least CPU Usage", "Optimum Balance" }));
        cbAlgorithms.setPreferredSize(new java.awt.Dimension(107, 18));

        btnTestService.setText("Test Services");
        btnTestService.setToolTipText("Select a cluster alias for do it a test.");
        btnTestService.setMaximumSize(new java.awt.Dimension(100, 20));
        btnTestService.setMinimumSize(new java.awt.Dimension(100, 20));
        btnTestService.setPreferredSize(new java.awt.Dimension(100, 20));
        btnTestService.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnTestServiceActionPerformed(evt);
            }
        });

        btnChoose.setToolTipText("Choose the convenient algorithm for load balance.");
        btnChoose.setLabel("Choose");
        btnChoose.setName("");
        btnChoose.setPreferredSize(new java.awt.Dimension(75, 20));
        btnChoose.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnChooseActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jLabel4)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(cbAlgorithms, javax.swing.GroupLayout.PREFERRED_SIZE, 135, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(btnChoose, javax.swing.GroupLayout.PREFERRED_SIZE, 98, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(95, 95, 95)
                        .addComponent(btnEndpointInfo, javax.swing.GroupLayout.PREFERRED_SIZE, 126, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(btnStickyRoutes, javax.swing.GroupLayout.DEFAULT_SIZE, 130, Short.MAX_VALUE))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel2)
                            .addComponent(jLabel3))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(cbEndpoint, javax.swing.GroupLayout.PREFERRED_SIZE, 202, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(btnShutdownService, javax.swing.GroupLayout.PREFERRED_SIZE, 207, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(btnDeregisterService, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(tfPassword, javax.swing.GroupLayout.PREFERRED_SIZE, 78, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18)
                                .addComponent(jLabel1)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(cbClusterAlias, javax.swing.GroupLayout.PREFERRED_SIZE, 93, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(btnCreateService, javax.swing.GroupLayout.PREFERRED_SIZE, 202, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(btnTestService, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))))
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel4)
                    .addComponent(cbAlgorithms, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnEndpointInfo, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnStickyRoutes, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnChoose, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(26, 26, 26)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(tfPassword, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel2)
                    .addComponent(jLabel1)
                    .addComponent(cbClusterAlias, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnCreateService, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnTestService, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(26, 26, 26)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(btnShutdownService, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel3)
                    .addComponent(cbEndpoint, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnDeregisterService, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(14, Short.MAX_VALUE))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

	private void cbEndpointFocusGained(java.awt.event.FocusEvent evt) {//GEN-FIRST:event_cbEndpointFocusGained
                try {
                        mLBPlugIn.stickyRoutes(mPlugInListener);
                } catch (WebSocketException lEx) {
                        Log(lEx.getClass().getSimpleName() + ":  " + lEx.getMessage());
                }
	}//GEN-LAST:event_cbEndpointFocusGained

        private void btnChooseActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnChooseActionPerformed
                try {
                        mLBPlugIn.changeAlgorithm(cbAlgorithms.getSelectedIndex() + 1, mPlugInListener);
                } catch (WebSocketException lEx) {
                        Log(lEx.getClass().getSimpleName() + ":  " + lEx.getMessage());
                }
        }//GEN-LAST:event_btnChooseActionPerformed

        private void btnEndpointInfoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnEndpointInfoActionPerformed
                try {
                        mLBPlugIn.clustersInfo(mPlugInListener);
                } catch (WebSocketException lEx) {
                        Log(lEx.getClass().getSimpleName() + ":  " + lEx.getMessage());
                }
        }//GEN-LAST:event_btnEndpointInfoActionPerformed

        private void btnStickyRoutesActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnStickyRoutesActionPerformed
                try {
                        mLBPlugIn.stickyRoutes(mPlugInListener);
                } catch (WebSocketException lEx) {
                        Log(lEx.getClass().getSimpleName() + ":  " + lEx.getMessage());
                }
        }//GEN-LAST:event_btnStickyRoutesActionPerformed

        private void btnCreateServiceActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnCreateServiceActionPerformed
                if (cbClusterAlias.getSelectedItem().equals("-Select-")) {
                        Log("INFO - Select the cluster alias!.");
                } else {
                        try {
                                String lPassword = tfPassword.getText();
                                String lClusterAlias = cbClusterAlias.getSelectedItem().toString();
                                String lServiceNamespace = mNamespaceLoaded.get(mServicesLoaded.indexOf(lClusterAlias));
                                mServices.add(mLBPlugIn.sampleService(lPassword, lClusterAlias, lServiceNamespace, mPlugInListener));
                        } catch (WebSocketException lEx) {
                                Log(lEx.getClass().getSimpleName() + ":  " + lEx.getMessage());
                        }
                }
        }//GEN-LAST:event_btnCreateServiceActionPerformed

        private void btnTestServiceActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnTestServiceActionPerformed
                try {
                        String lServiceNamespace = mNamespaceLoaded.get(mServicesLoaded.indexOf(cbClusterAlias.getSelectedItem().toString()));

                        Token lRequest = TokenFactory.createToken(lServiceNamespace, "test");
                        mBaseClient.sendToken(lRequest, mPlugInListener);
                } catch (WebSocketException lEx) {
                        Log(lEx.getClass().getSimpleName() + ":  " + lEx.getMessage());
                }
        }//GEN-LAST:event_btnTestServiceActionPerformed

        private void btnShutdownServiceActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnShutdownServiceActionPerformed
                try {
                        String lPassword = tfPassword.getText();
                        String lClusterAlias = cbClusterAlias.getSelectedItem().toString();
                        String lEndpoint = cbEndpoint.getSelectedItem().toString();

                        mLBPlugIn.shutdownEndPoint(lPassword, lClusterAlias, (!"".equals(lEndpoint) ? lEndpoint : "*"), mPlugInListener);
                } catch (WebSocketException lEx) {
                        Log(lEx.getClass().getSimpleName() + ":  " + lEx.getMessage());
                }
        }//GEN-LAST:event_btnShutdownServiceActionPerformed

        private void btnDeregisterServiceActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnDeregisterServiceActionPerformed
                try {
                        String lPassword = tfPassword.getText();
                        String lClusterAlias = cbClusterAlias.getSelectedItem().toString();
                        String lEndpoint = cbEndpoint.getSelectedItem().toString();

                        mLBPlugIn.deregisterServiceEndPoint(lPassword, lClusterAlias, !"".equals(lEndpoint) ? lEndpoint : "*", mPlugInListener);
                } catch (WebSocketException lEx) {
                        Log(lEx.getClass().getSimpleName() + ":  " + lEx.getMessage());
                }
        }//GEN-LAST:event_btnDeregisterServiceActionPerformed

        private void formWindowClosed(java.awt.event.WindowEvent evt) {//GEN-FIRST:event_formWindowClosed
                Log("Load Balancer Demo shutdown");
        }//GEN-LAST:event_formWindowClosed

        private void cbClusterAliasFocusGained(java.awt.event.FocusEvent evt) {//GEN-FIRST:event_cbClusterAliasFocusGained
                if (mServicesLoaded.isEmpty()) {
                        Log("INFO - Press key 'Endpoints Info' to load dynamically the cluster alias and their namespaces!.");
                }
        }//GEN-LAST:event_cbClusterAliasFocusGained

        private void Log(String aMessage) {
                System.out.println(aMessage);
        }

        /**
         * @param args the command line arguments
         */
        public static void main(String args[]) {
                /*
                 * Set the Nimbus look and feel
                 */
                //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /*
                 * If Nimbus (introduced in Java SE 6) is not available, stay
                 * with the default look and feel. For details see
                 * http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html
                 */
                try {
                        for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                                if ("Nimbus".equals(info.getName())) {
                                        javax.swing.UIManager.setLookAndFeel(info.getClassName());
                                        break;
                                }
                        }
                } catch (ClassNotFoundException ex) {
                        java.util.logging.Logger.getLogger(LoadBalancerDialog.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
                } catch (InstantiationException ex) {
                        java.util.logging.Logger.getLogger(LoadBalancerDialog.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
                } catch (IllegalAccessException ex) {
                        java.util.logging.Logger.getLogger(LoadBalancerDialog.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
                } catch (javax.swing.UnsupportedLookAndFeelException ex) {
                        java.util.logging.Logger.getLogger(LoadBalancerDialog.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
                }
                //</editor-fold>

                /*
                 * Create and display the form
                 */
                java.awt.EventQueue.invokeLater(new Runnable() {

                        @Override
                        public void run() {
                                new LoadBalancerDialog().setVisible(true);
                        }
                });
        }
    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnChoose;
    private javax.swing.JButton btnCreateService;
    private javax.swing.JButton btnDeregisterService;
    private javax.swing.JButton btnEndpointInfo;
    private javax.swing.JButton btnShutdownService;
    private javax.swing.JButton btnStickyRoutes;
    private javax.swing.JButton btnTestService;
    private javax.swing.JComboBox cbAlgorithms;
    private static javax.swing.JComboBox cbClusterAlias;
    private static javax.swing.JComboBox cbEndpoint;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JPasswordField tfPassword;
    // End of variables declaration//GEN-END:variables

        class PlugInListener implements WebSocketResponseTokenListener {

                @Override
                public long getTimeout() {
                        return 10000;
                }

                @Override
                public void setTimeout(long aTimeout) {
                }

                @Override
                public void OnTimeout(Token aToken) {
                }

                @Override
                public void OnResponse(Token aToken) {

                        if (!aToken.getString("reqType").equals("test")) {
                                Log("Received Token: " + aToken.toString());
                        }

                        if (aToken.getString("reqType").equals("clustersInfo")) {
                                if (mServicesLoaded.isEmpty() || mNamespaceLoaded.isEmpty()) {
                                        mServicesLoaded.clear();
                                        mNamespaceLoaded.clear();

                                        List<Map<String, Object>> lInfo = (List<Map<String, Object>>) aToken.getList("data");
                                        for (int lPos = 0; lPos < lInfo.size(); lPos++) {
                                                mServicesLoaded.add(lInfo.get(lPos).get("clusterAlias").toString());
                                                mNamespaceLoaded.add(lInfo.get(lPos).get("clusterNS").toString());
                                        }

                                        cbClusterAlias.removeAllItems();
                                        for (int lPos = 0; lPos < mServicesLoaded.size(); lPos++) {
                                                cbClusterAlias.addItem(mServicesLoaded.get(lPos));
                                        }
                                        cbClusterAlias.repaint();
                                }
                        } else if (aToken.getString("reqType").equals("stickyRoutes")) {
                                cbEndpoint.removeAllItems();
                                if (aToken.getInteger("code") != -1) {
                                        List<Map<String, Object>> lRoutes = (List<Map<String, Object>>) aToken.getList("data");
                                        String lClusterAlias = cbClusterAlias.getSelectedItem().toString();

                                        for (int lPos = 0; lPos < lRoutes.size(); lPos++) {
                                                if (lRoutes.get(lPos).get("clusterAlias").equals(lClusterAlias)) {
                                                        cbEndpoint.addItem(lRoutes.get(lPos).get("endPointId"));
                                                }
                                        }
                                }
                        }

                        if (cbEndpoint.getItemCount() == 0) {
                                cbEndpoint.addItem("-Select the cluster endpoint-");
                        }
                        cbEndpoint.repaint();
                }

                @Override
                public void OnSuccess(Token aToken) {
                }

                @Override
                public void OnFailure(Token aToken) {
                }
        }
}
