/**
 * GET /
 * Demo page.
 */

exports.index = function(req, res) {
  res.render('demo', {
    title: 'Demo'
  });
};