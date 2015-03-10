var expect = require('chai').expect;
var test = require('./lib/test.js');

describe('Variables', function() {
  it('should substitute variables', function() {
    test({
      fixture: 'List with variables',
      done: function($) {
        expect($('ul').attr('class')).to.equal('data1');
        expect($('li').get(0).textContent).to.equal('data1');
        expect($('li').get(1).textContent).to.equal('data1data2data3data4data5');
        expect($('li').get(2).textContent).to.equal('text1 data1 text2 data2 text3');
        expect($('li').get(3).textContent).to.equal('data1 text1 data2 text2');
        expect($('span').get(0).textContent).to.equal('data2');
        expect($('span').get(1).textContent).to.equal('data4');
      },
      data: {
        var1: 'data1',
        var2: 'data2',
        var3: 'data3',
        var4: 'data4',
        var5: 'data5'
      }
    });
  });

  it('should substitute nested variables', function() {
    test({
      fixture: 'Nested data',
      done: function($) {
        expect($('div').text()).to.equal('First Name');
      },
      data: {
        person: {
          name: {
            first: 'First Name'
          }
        }
      }
    });
  });

  it('should allow use of data', function() {
    test({
      fixture: 'Data with data',
      done: function($) {
        expect($('div')[0].textContent).to.equal('Name');
        expect($('div').parent().contents()[2].textContent).to.equal('small');
        expect($('div').parent().contents()[3].innerHTML).to.equal('BIG');
        expect($('div')[1].innerHTML).to.equal('<strong>BIG</strong> text');
      },
      data: {
        name: 'Name',
        htmlText: 'small<strong>BIG</strong>',
        htmlText2: '<strong>BIG</strong>'
      }
    });
  });

  it('should substitute empty string for null or undefined data', function() {
    test({
      fixture: 'Data with data',
      done: function($) {
        expect($('div')[0].textContent).to.equal('');
        expect($('div').parent().contents()[2].textContent).to.equal('\n');
        expect($('div')[1].innerHTML).to.equal(' text');
      },
      data: {
        name: null,
        htmlText: null
      }
    });
  });

  it('should allow properties as numbers', function() {
    test({
      fixture: 'Data with number properties',
      done: function($) {
        expect($('li')[0].textContent).to.equal('Item 1');
        expect($('li')[1].textContent).to.equal('Item 2');
      },
      data: [
        'Item 1',
        'Item 2',
      ]
    });
  });

  it('should support method invocation', function() {
    test({
      fixture: 'Method invocation with arguments',
      done: function($) {
        expect($('ul').attr('data-first')).to.equal('firstVal');
        expect($('ul').attr('data-second')).to.equal('secondVal');
        expect($('ul').attr('data-result')).to.equal('result');
        expect($('li')[0].textContent).to.equal('firstVal');
        expect($('li')[1].textContent).to.equal('firstValsecondVal');
        expect($('li')[2].textContent).to.equal('result');
      },
      data: {
        passThrough: function(arg1, arg2) {
          return arg1 + (arg2 || '');
        },
        giveResult: function() {
          return 'result';
        },
        val1: 'firstVal',
        val2: 'secondVal'
      }
    });
  });
});
