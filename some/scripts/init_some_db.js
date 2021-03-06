// clear out the existing data
db.some_pages.remove();
db.some_nodes.remove();

// create indexes
db.some_nodes.ensureIndex({ "target_id": 1 }, { unique: true });
db.some_nodes.ensureIndex({ "parent_id": 1 });
db.some_nodes.ensureIndex({ "order": 1 });

// initial page content
var page = { 
  "title" : "Home", 
  "body": "<p>Welcome.</p>"
};
db.some_pages.insert(page);
page = db.some_pages.findOne();

// inital content tree
var page_node = {
  "label" : page.title,
  "target_type" : "some_pages",
  "target_id" : page._id,
  "parent_id" : null,
  "order" : 1
};
db.some_nodes.insert(page_node);
